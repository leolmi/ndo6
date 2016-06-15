/* Created by Leo on 15/06/2016. */
'use strict';

angular.module('ndo6App')
  .controller('MarkerCtrl', ['$scope', 'ndo6',
    function ($scope,ndo6) {
    function getStr() {
      var result = [];
      var info = $scope.modal.context.info;
      _.keys(info).forEach(function (k) {
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
            var dt = new Date(info[k]);
            result.push(k+': '+dt.toLocaleDateString()+' '+dt.toLocaleTimeString());
            break;
          default:
            if (info[k] != undefined)
              result.push(k+': '+info[k]);
            break;
        }

      });
      return result.join('\n');
    }
    $scope.infoStr = getStr();
    $scope.markerIcon = ndo6.getTypeIcon($scope.modal.context.info.type);
  }]);
