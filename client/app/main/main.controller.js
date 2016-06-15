'use strict';

angular.module('ndo6App')
  .factory('initializer', function($window, $q){

    //Google's url for async maps initialization accepting callback function
    var key = 'AIzaSyBHW4T8X_iF8xsEwpkMZU4DZI0HMuLcH9M'; // 'AIzaSyDTZdq_Pe8oUs90WPT0oek-5DkDkr28HCA';
    var asyncUrl = 'https://maps.googleapis.com/maps/api/js?key='+key+'&libraries=geometry,places&callback=',
      mapsDefer = $q.defer();

    //Callback function - resolving promise after maps successfully loaded
    $window.googleMapsInitialized = mapsDefer.resolve;

    //Async loader
    var asyncLoad = function(asyncUrl, callbackName) {
      var script = document.createElement('script');
      script.src = asyncUrl + callbackName;
      document.body.appendChild(script);
    };
    //Start loading google maps
    asyncLoad(asyncUrl, 'googleMapsInitialized');

    //Usage: initializer.mapsInitialized.then(callback)
    return {
      mapsInitialized : mapsDefer.promise
    };
  })
  .controller('MainCtrl', ['$scope', '$rootScope', '$http', '$window', '$location', 'socket', '$timeout', 'initializer', 'maps','Auth','ndo6','Position','uiUtil','Modal','Logger',
    function ($scope, $rootScope, $http, $window, $location, socket, $timeout, initializer, maps, Auth, ndo6, Position, uiUtil, Modal, Logger) {
      $scope.monitorHeight = 200;
      $scope.options = ndo6.options;
      $scope.session = ndo6.session;

      initializer.mapsInitialized.then(function () {
        maps.createContext(google, ndo6.centerMap, function (ctx) {
          ndo6.session.context = ctx;
          //verifica la presenza di inviti
          ndo6.checkInvitation()
            .then(function(data) {
              $scope.loading = false;
              //se è un invito valido mostra il popup per accettarlo
              if (data && data.invitation) {
                var opt = {
                  data: data,
                  template: Modal.templates.accept,
                  ok: {text:'Accept'},
                  cancel: true,
                  show: {footer: true}
                };
                Modal.show(opt, 'popup')
                  .then(function (o) {
                    //se accettato imposta la mappa dell'invito
                    ndo6.setMap(o.data.map);
                  });
              }
            });
        });
      }, function (err) {
        $scope.error = err ? err.message : 'Errors loading map!';
        $scope.loading = false;
      });


      function logout() {
        Auth.logout();
        ndo6.reset();
        $location.path('/login');
      }

      function loop() {
        if (!ndo6.options.active) return;
        $timeout(function(){
          ndo6.readPosition()
            .finally(loop);
        }, ndo6.options.delay);
      }

      $scope.closeOverpage = function() {
        $scope.overpage = undefined;
      };

      function showSettings() {
        openPage('settings');
      }



      $scope.openMenu = function(e) {
        uiUtil.toggleMenu(e);
      };

      function openPage(template, params){
        if ($scope.overpage && $scope.overpage.name == template) {
          $scope.closeOverpage();
        } else {
          $scope.overpage = {
            name: template,
            template: 'app/overpages/overpage-' + template + '.html',
            params: params
          };
        }
      }



      function center(m, zoom) {
        var pos = m ? m.pos : undefined;
        ndo6.centerUser(pos, zoom);
      }

      function invite() {
        if (!ndo6.session.map) {
          Logger.warning('No active map', 'Create new map or select one to share position.');
          return;
        }
        var exp = new Date();
        exp.setDate(exp.getDate() + 10);
        var opt = {
          invitation: {
            map: ndo6.session.map._id,
            userMessage: 'Hi, '+ndo6.session.user.name+' invite you to map "'+ndo6.session.map.name+'"',
            target: '',
            expdate: exp
          },
          title: 'Invite others to the map '+ndo6.session.map.name,
          template: Modal.templates.invite,
          ok: true,
          cancel: true
        };
        Modal.show(opt, 'popup')
          .then(function(o){
            if (!o.invitation.target) return Logger.error('Error','Add one target email at least!');
            o.invitation.expiration = o.invitation.expdate.getTime();
            $http.post('/api/invitations', o.invitation)
              .then(function() {
                Logger.info('Invitation successfully sent!');
              }, ndo6.errHandler)
          });
      }


      $scope.execOnPosition = function() {
        var opt = {
          title: 'Marker',
          marker: {
            label: 'P',
            title: '',
            icon: maps.getIcon('purple'),
            pos: ndo6.session.context.map.getCenter()
          },
          template: Modal.templates.position,
          ok: {text: 'Add'},
          cancel: true
        };
        Modal.show(opt, 'popup')
          .then(function(o){
            ndo6.share('point', o.marker);
          });
      };

      $scope.execMaps = function() {
        openPage('maps');
      };
      $scope.execShared = function() {
        openPage('shared');
      };
      $scope.execSnapshot = function() {
        //TODO: snapshot
      };

      $scope.deleteMap = function(map) {
        if (!map) return;
        var action = map.invite ? 'Refuse' : 'Delete';
        var opt = Modal.confirm.getAskOptions(Modal.types.delete, map.name, action);
        Modal.show(opt)
          .then(function () {
            ndo6.deleteMap(map);
          });
      };

      $scope.editMap = function(map) {
        var title = map ? 'Edit Map' : 'New Map';
        map = map || {
            name: 'new map',
            description: '',
            active: true
          };
        var opt = {
          title: title,
          map: map,
          template: Modal.templates.map,
          ok: true,
          cancel: true
        };
        Modal.show(opt, 'popup')
          .then(function(o){
            $http.post('/api/maps', o.map)
              .then(function(resp) {
                ndo6.session.map = resp.data;
              }, ndo6.errHandler)
          });
      };

      $scope.pointCenter = function(p) {
        ndo6.centerMap(p);
        $scope.closeOverpage();
      };

      $scope.editPoint = function(p) {
        //TODO: editor points
      };

      $scope.editWay = function(way) {
        var title = way ? 'Edit Way' : 'New Way';
        var start= '', end='';
        if (way && way.points.length) {
          start = way.points[0].id;
          way.points.shift();
          if (way.points.length) {
            end = way.points[way.points.length - 1].id;
            way.points.pop();
          }
        }
        way = way || {
            title: 'New Way',
            notes: '',
            mode: 'car',
            points: []
          };
        var opt = {
          title: title,
          start: start,
          end: end,
          way: way,
          template: Modal.templates.way,
          ok: {text: 'Calc'},
          cancel: true
        };
        Modal.show(opt, 'popup')
          .then(function (o) {
            o.way.points.push(o.end);
            o.way.points.unshift(o.start);
            o.way.points = _.map(o.way.points, function (p) {
              var m = _.find(ndo6.data.markers, function (m) {
                return m.ndo6.id == p;
              });
              return {
                id: p,
                latitude: m ? m.position.lat() : null,
                longitude: m ? m.position.lng() : null
              }
            });
            ndo6.share('way', o.way);
            //TODO: Calcolo del percorso e visualizza sulla mapppa
          });
      };

      function search() {
        //TODO: search elements
      }

      function help() {
        openPage('help');
      }

      $scope.menu = [{
        icon: 'fa-map',
        caption: 'New Map',
        action: function() { $scope.editMap(); }
      },{
        icon: 'fa-code-fork',
        caption: 'New Way',
        action: function() { $scope.editWay(); }
      },{
        divider: true
      },{
        caption: 'Center Me',
        icon: 'fa-crosshairs',
        action: center
      },{
        disabled: function() { return !ndo6.session.map; },
        caption: 'Invite',
        icon: 'fa-paper-plane',
        action: invite
      },{
        disabled: function() { return true; },
        caption: 'Search',
        icon: 'fa-search',
        action: search
      },{
        caption: 'Help',
        icon: 'fa-user-md',
        action: help
      },{
        divider: true
      },{
        caption: 'Settings',
        icon: 'fa-cog',
        action: showSettings
      },{
        caption: 'Logout',
        icon: 'fa-sign-out',
        action: logout
      }];





      $rootScope.$on('SHOWING-MODAL', function() {
        $scope.closeOverpage();
      });

      $rootScope.$on('CLICK-ON-MARKER', function(e, marker){
        var opt = {
          title:'Marker Info',
          template: Modal.templates.marker,
          info: marker.ndo6,
          ok:true,
          cancel:false
        };
        Modal.show(opt, 'popup');
      });

      $scope.$watch(function() { return ndo6.options.active; }, function(){
        if (ndo6.options.active) loop();
      });



      ndo6.refresh();
      loop();
    }]);
