'use strict';

angular.module('ndo6App')
  .controller('WayCtrl', ['$scope','ndo6','uiUtil',
    function ($scope,ndo6,uiUtil) {
      $scope.markers = _.clone(ndo6.data.markers);
      $scope.addPoint =  function() {
        $scope.modal.context.way.points.push({});
      };
      $scope.removePoint =  function(p) {
        uiUtil.remove($scope.modal.context.way.points, p);
      };
      function getNextMode() {
        switch ($scope.modal.context.way.mode) {
          case 'car': return 'walk';
          default: return 'car';
        }
      }
      $scope.toggleMode = function() {
        $scope.modal.context.way.mode = getNextMode();
      };
    }]);
