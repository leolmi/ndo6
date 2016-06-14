/* Created by Leo on 13/06/2016. */
'use strict';

angular.module('ndo6App')
  .controller('MapsCtrl', ['$scope','ndo6','$http','Modal',
    function ($scope, ndo6, $http,Modal) {
      $scope.searchText = '';

      function readCurrent() {
        $scope.current = ndo6.session.map ? ndo6.session.map._id : undefined;
      }

      $scope.set = function(map) {
        if (($scope.current && map && $scope.current == map._id) || (!$scope.current && !map)) return;
        var opt = Modal.confirm.getAskOptions(Modal.MODAL_OKCANCEL);
        opt.title = 'Set the map';
        opt.body = '<p>Confirm set map <strong>' + (map ? map.name : 'private map') + '</strong> ?</p>';
        Modal.show(opt)
          .then(function () {
            ndo6.setMap(map)
              .then(readCurrent);
          });
      };

      $http.get('/api/maps')
        .then(function(resp){
          $scope.maps = resp.data;
        }, ndo6.errHandler);

      readCurrent();
    }]);
