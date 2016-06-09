'use strict';

angular.module('ndo6App')
  .factory('ndo6', ['$q',
    function($q) {

      function checkGeo() {
        return $q(function(resolve, reject){
          if (!navigator.geolocation)
            return reject('Geolocation is not supported by this browser.');
          navigator.geolocation.getCurrentPosition(function() {
            resolve('Geolocation is not activated.');
          }, function() {
            reject();
          });
        });

      }

      return {
        checkGeo:checkGeo
      }
    }]);
