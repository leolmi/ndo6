/* Created by Leo on 15/06/2016. */
'use strict';

angular.module('ndo6App')
  .controller('SharedCtrl', ['$scope','ndo6','Modal',
    function ($scope, ndo6,Modal) {
      $scope.data = {
        points: _.clone(ndo6.data.points),
        ways: _.clone(ndo6.data.ways)
      };

      $scope.isMine = function(o) {
        return (o && o.owner==ndo6.session.user._id);
      };

      $scope.activate = function(o) {
        $scope.activeObject = o;
      };

      function deleteSomething(name, cb) {
        var opt = Modal.confirm.getAskOptions(Modal.types.delete, name);
        Modal.show(opt)
          .then(cb);
      }


      $scope.pointDelete = function(p) {
        deleteSomething(p.title, function() {
          ndo6.delete('point', p._id);
        });
      };

      $scope.wayToggle = function(w) {

      };
      $scope.wayDelete = function(w) {
        deleteSomething(w.title, function() {
          ndo6.delete('way', w._id);
        });
      };
    }]);
