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
  .controller('MainCtrl', ['$scope', '$http', '$window', '$location', 'socket', '$timeout', 'initializer', 'maps','Auth','ndo6','Position','uiUtil',
    function ($scope, $http, $window, $location, socket, $timeout, initializer, maps, Auth, ndo6, Position, uiUtil) {

      $scope.monitorHeight = 200;
      $scope.currentMap = {};

      /**
       * Centra la mappa
       * @param pos
       * @param [finder]
       */
      $scope.centerMap = function(pos, finder){
        if (!$scope.context) return;
        // il centro è considerato più in alto per
        // lasciare lo spazio al monitor
        var bounds = $scope.context.map.getBounds();
        if (!bounds) return;
        var dl = bounds.getNorthEast().lat() - bounds.getSouthWest().lat();
        var H = angular.element($window).height();
        var ddl = ($scope.monitorHeight * dl)/(2*H);

        // Calcola le coordinate del centro
        var latLng = maps.getLatLng($scope.context.G, pos);

        // Imposta il centro della mappa
        $scope.context.map.setCenter(latLng);

        var mrk = finder ? finder() : null;
        if (mrk) {
          // Se ha trovato il marker lo anima
          mrk.setAnimation($scope.context.G.maps.Animation.BOUNCE);
          $timeout(function() { mrk.setAnimation(null); }, 1000);
        }
      };

      initializer.mapsInitialized.then(function () {
        maps.createContext(google, $scope.centerMap, function (ctx) {
          $scope.context = ctx;
          // initWatchers();
          $scope.loading = false;
        });
      }, function (err) {
        $scope.error = err ? err.message : 'Errori nel caricamento della mappa!';
        $scope.loading = false;
        // refreshMarkers();
        // checkErrors();
      });

      $scope.logout = function() {
        Auth.logout();
        ndo6.reset();
        $location.path('/login');
      };

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
              if ($scope.currentMap.id && ndo6.options.active)
                $http.post('/api/position/'+$scope.currentMap.id, npos);
              _last.keep(npos);
            }
            loop();
          }, function () {
            loop();
          });
      }

      // var _menu;
      // $window.onmouseup = function(e) {
      //   if (_menu && !_menu.is(e.target) && _menu.has(e.target).length === 0)
      //     _menu.removeClass('open');
      // };

      // $(window).on('mouseup', function(e){
      //   //var container = $("YOUR CONTAINER SELECTOR");
      //
      //   if (_menu && !_menu.is(e.target) // if the target of the click isn't the container...
      //     && _menu.has(e.target).length === 0) // ... nor a descendant of the container
      //   {
      //     _menu.removeClass('open')
      //   }
      //
      //
      //
      // });

      $scope.closeOverlay = function() {
        $scope.overpage = undefined;
      };

      $scope.showSettings = function() {
        openPage('settings');
      };



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
        if ($scope.context) {
          var m = new $scope.context.G.maps.Marker({
            map: $scope.context.map,
            label: 'io',
            position: maps.getLatLng($scope.context.G, _last)
          });
          ndo6.options.markers.push(m);
          $scope.centerMap(m.position);
        }
      }, true);


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
