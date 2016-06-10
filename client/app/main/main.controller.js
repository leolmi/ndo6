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
        $scope.error = err ? err.message : 'Errori nel caricamento della mappa!';
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
                $http.post('/api/position/'+ndo6.session.map.id, npos);
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

      $scope.$watch(function() { return ndo6.options.active; }, function(){
        if (ndo6.options.active) loop();
      });

      $scope.$watch(function() { return _last; }, function(){
        //Aggiorna la posizione del marker
        ndo6.options.clearMarkers();
        if (ndo6.session.context) {
          var m = new ndo6.session.context.G.maps.Marker({
            map: ndo6.session.context.map,
            label: 'io',
            position: maps.getLatLng(ndo6.session.context.G, _last)
          });
          ndo6.options.markers.push(m);
          $scope.centerMap(m.position);
        }
      }, true);

      function center(m) {
        if (ndo6.session.context && _last) {
          var pos = maps.getLatLng(ndo6.session.context.G, _last);
          $scope.centerMap(pos);
        }
      }

      function errHanlder(err) {
        var msg = _.isObject(err) ? err.message || err.data : err;
        Logger.error('Error', msg);
      }

      var modalInvite = Modal.confirm.popup(function(opt){
        //Logger.info('TODO','invita gli amici nel gruppo: '+JSON.stringify(opt));
        //cache.invite(opt.mails, cache.user);
        //TODO: invita altri membri nel gruppo
        $http.post('/api/invitations', opt)
          .then(function() {
            Logger.info('Invite successfully sended!');
          }, errHanlder)
      });
      function invite() {
        // if (!ndo6.session.map) {
        //   Logger.warning('No active map', 'Create new map or select one to share position.');
        //   return;
        // }
        ndo6.session.map = {title: 'Ciccio Ciccio ....'};
        var opt = {
          title: 'Invita altre persone nel gruppo indicandone la mail',
          template: Modal.TEMPLATE_INVITE,
          ok: true,
          cancel: true,
          fixedmessage: 'Ciao, ' + ndo6.session.user.name + ' ti invita ad entrare sulla mappa "' + ndo6.session.map.title + '".\n' +
          'Vai sul sito ' + $rootScope.product.name.toLowerCase() + '.herokuapp.com, registrati o accedi se già ti sei registrato.\n' +
          'Una volta entrato vedrai la notifica per accedere alla mappa condivisa.',
          message: '',
          emails: ''
        };
        modalInvite(opt);
      }


      $scope.menu = [{
        disabled: true,
        caption: 'Monitor',
        action: angular.noop
      },{
        caption: 'Center Me',
        action: center
      },{
        disabled: true,
        caption: 'Share Position',
        action: angular.noop
      },{
        caption: 'Invite',
        action: invite
      },{
        divider: true
      },{
        caption: 'Settings',
        action: showSettings
      },{
        caption: 'Logout',
        action: logout
      }];


      loop();

      // $scope.awesomeThings = [];
      //
      // $http.get('/api/things').success(function(awesomeThings) {
      //   $scope.awesomeThings = awesomeThings;
      //   socket.syncUpdates('thing', $scope.awesomeThings);
      // });
      //
      // $scope.addThing = function() {
      //   if($scope.newThing === '') {
      //     return;
      //   }
      //   $http.post('/api/things', { name: $scope.newThing });
      //   $scope.newThing = '';
      // };
      //
      // $scope.deleteThing = function(thing) {
      //   $http.delete('/api/things/' + thing._id);
      // };
      //
      // $scope.$on('$destroy', function () {
      //   socket.unsyncUpdates('thing');
      // });
    }]);
