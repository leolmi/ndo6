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
      /**
       * Centra la mappa
       * @param pos
       * @param [finder]
       */
      $scope.centerMap = function(pos, finder){
        if (!ndo6.session.context) return;
        // il centro è considerato più in alto per
        // lasciare lo spazio al monitor
        var bounds = ndo6.session.context.map.getBounds();
        if (!bounds) return;
        var dl = bounds.getNorthEast().lat() - bounds.getSouthWest().lat();
        var H = angular.element($window).height();
        var ddl = ($scope.monitorHeight * dl)/(2*H);

        // Calcola le coordinate del centro
        var latLng = maps.getLatLng(ndo6.session.context.G, pos);

        // Imposta il centro della mappa
        ndo6.session.context.map.setCenter(latLng);

        var mrk = finder ? finder() : null;
        if (mrk) {
          // Se ha trovato il marker lo anima
          mrk.setAnimation(ndo6.session.context.G.maps.Animation.BOUNCE);
          $timeout(function() { mrk.setAnimation(null); }, 1000);
        }
      };

      initializer.mapsInitialized.then(function () {
        maps.createContext(google, $scope.centerMap, function (ctx) {
          ndo6.session.context = ctx;
          // initWatchers();
          $scope.loading = false;
        });
      }, function (err) {
        $scope.error = err ? err.message : 'Errors loading map!';
        $scope.loading = false;
        // refreshMarkers();
        // checkErrors();
      });


      function logout() {
        Auth.logout();
        ndo6.reset();
        $location.path('/login');
      }

      var _last = new Position();

      function loop() {
        if (!ndo6.options.active) return;
        $timeout(function(){
          read();
        }, ndo6.options.delay);
      }

      function read() {
        ndo6.readPosition()
          .then(function (pos) {
            var npos = new Position(pos);
            if (!_last || !_last.sameOf(npos)) {
              if (ndo6.session.map && ndo6.options.active)
                $http.post('/api/positions/'+ndo6.session.map._id, npos);
              _last.keep(npos);
            }
            loop();
          }, function () {
            loop();
          });
      }

      $scope.closeOverlay = function() {
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
          $scope.closeOverlay();
        } else {
          $scope.overpage = {
            name: template,
            template: 'app/overpages/overpage-' + template + '.html',
            params: params
          };
        }
      }



      function center(m) {
        if (ndo6.session.context && _last) {
          var pos = maps.getLatLng(ndo6.session.context.G, _last);
          $scope.centerMap(pos);
        }
      }

      function invite() {
        if (!ndo6.session.map) {
          Logger.warning('No active map', 'Create new map or select one to share position.');
          return;
        }
        var opt = {
          title: 'Invite others to the current map',
          template: Modal.TEMPLATE_INVITE,
          ok: true,
          cancel: true,
          fixedmessage: 'Ciao, ' + ndo6.session.user.name + ' invite you to the map "' + ndo6.session.map.name + '".\n' +
            'Follow the link: [PRIVATE-LINK-BOOKMARK]\n'+
            'Otherwise go on ' + $rootScope.product.name.toLowerCase() + '.herokuapp.com, register or log in if you already registered.\n' +
            'Once you entered you will see the notification to access the shared map.',
          message: '',
          emails: ''
        };
        // modalInvite(opt);
        Modal.show(opt, 'popup')
          .then(function(o){
            $http.post('/api/invitations', o)
              .then(function() {
                Logger.info('Invite successfully send!');
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
          template: Modal.TEMPLATE_POSITION,
          ok: {text: 'Add'},
          cancel: true
        };
        Modal.show(opt, 'popup')
          .then(function(o){
            var m  = ndo6.getMarker(o.marker);
            ndo6.replaceOrAdd(m);
          });
      };

      $scope.execMaps = function() {
        openPage('maps');
      };
      $scope.execShared = function() {
        //openPage('shared');
      };
      $scope.execSnapshot = function() {
        //TODO: snapshot
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
          template: Modal.TEMPLATE_MAP,
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


      $scope.editWay = function(way) {
        var title = way ? 'Edit Way' : 'New Way';
        way = way || {
            title: 'New Way',
            mode: 'car',
            points:[]
          };
        var opt = {
          title: title,
          way: way,
          template: Modal.TEMPLATE_WAY,
          ok: {text: 'Add'},
          cancel: true
        };
        Modal.show(opt, 'popup')
          .then(function(o){
            ///TEMP>>>>>
            Logger.info('Way', 'New way created!')
            ///<<<<<<<<<
          });
      };

      function search() {

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
      // },{
      //   disabled: function() { return true; },
      //   caption: 'Monitor',
      //   icon: 'fa-desktop',
      //   action: angular.noop
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
        $scope.closeOverlay();
      });

      $rootScope.$on('CLICK-ON-MARKER', function(e, marker){
        Logger.info('Click on marker', 'marker:'+JSON.stringify(marker.ndo6));
      });

      $scope.$watch(function() { return ndo6.options.active; }, function(){
        if (ndo6.options.active) loop();
      });

      $scope.$watch(function() { return _last; }, function(){
        //Aggiorna la posizione del marker
        if (ndo6.session.context && !ndo6.session.map) {
          var m = ndo6.getMarker({
            id: 'user@'+ndo6.session.user.name,
            title: ndo6.session.user.name,
            label: 'I',
            type: 'user',
            pos: maps.getLatLng(ndo6.session.context.G, _last),
            user: ndo6.session.user.name
          });
          ndo6.replaceOrAdd(m);
          if (ndo6.options.centerFirst || ndo6.options.centerLocked) {
            $scope.centerMap(m.position);
            ndo6.options.centerFirst = false;
          }
        }
      }, true);


      ndo6.refresh();
      loop();
    }]);
