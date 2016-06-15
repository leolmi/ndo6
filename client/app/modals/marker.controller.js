/* Created by Leo on 15/06/2016. */
'use strict';

angular.module('ndo6App')
  .controller('MarkerCtrl', ['$scope', function ($scope) {
    function getStr() {
      var result = [];

      _.keys($scope.modal.context.info).forEach(function (k) {
        switch(k) {
          // case 'id':
          case '_id':
          case 'last':
          case 'center':
          case 'icon':
          case 'map':
            //skip
            break;
          case 'timestamp':
            var dt = new Date($scope.modal.context.info[k]);
            result.push(k+': '+dt.toLocaleDateString()+' '+dt.toLocaleTimeString());
            break;
          default:
            if ($scope.modal.context.info[k] != undefined)
              result.push(k+': '+$scope.modal.context.info[k]);
            break;
        }

      });
      return result.join('\n');
    }
    $scope.infoStr = getStr();
  }]);
