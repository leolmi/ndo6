/* Created by Leo on 15/06/2016. */
'use strict';

angular.module('ndo6App')
  .controller('SharedCtrl', ['$scope','ndo6',
    function ($scope, ndo6) {
      $scope.data = {
        points: _.clone(ndo6.data.points),
        ways: _.clone(ndo6.data.ways)
      };
      
      $scope.activate = function(o) {
        $scope.activeObject = o;
      }
    }]);
