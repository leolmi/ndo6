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
  .controller('MainCtrl', ['$scope', '$http', '$window', 'socket', '$timeout', 'initializer', 'maps',
    function ($scope, $http, $window, socket, $timeout, initializer, maps) {

      $scope.monitorHeight = 200;

      /**
       * Centra la mappa
       * @param pos
       * @param [finder]
       */
      $scope.centerMap = function(pos, finder){
        // il centro è considerato più in alto per
        // lasciare lo spazio al monitor
        var bounds = $scope.context.map.getBounds();
        if (!bounds) return;
        var dl = bounds.getNorthEast().lat() - bounds.getSouthWest().lat();
        var H = angular.element($window).height();
        var ddl = ($scope.monitorHeight * dl)/(2*H);

        // Calcola le coordinate del centro
        var latLng = maps.getLatLng(google, pos);

        // Imposta il centro della mappa
        $scope.context.map.setCenter(latLng);

        var mrk = finder ? finder() : null;
        if (mrk) {
          // Se ha trovato il marker lo anima
          mrk.setAnimation(google.maps.Animation.BOUNCE);
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
