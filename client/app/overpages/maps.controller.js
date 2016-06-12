/* Created by Leo on 13/06/2016. */
'use strict';

angular.module('ndo6App')
  .controller('MapsCtrl', ['$scope','ndo6','$http',
    function ($scope, ndo6, $http) {
      $http.get('/api/maps')
        .then(function(maps){
          $scope.maps = maps;
        }, ndo6.errHandler);
    }]);
