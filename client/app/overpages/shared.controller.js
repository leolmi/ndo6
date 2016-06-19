/* Created by Leo on 15/06/2016. */
'use strict';

angular.module('ndo6App')
  .controller('SharedCtrl', ['$scope','ndo6','maps','Modal','Logger','settings',
    function ($scope, ndo6, maps, Modal, Logger,settings) {
      $scope.idle = null;
      $scope.settings = settings.data;
      $scope.data = {
        points: _.clone(ndo6.data.points),
        ways: _.clone(ndo6.data.ways),
        positions: _(ndo6.data.positions)
          .filter(function(p) {
            return p.last;
          }).clone()
      };

      $scope.isMine = function(o) {
        return (o && o.owner==ndo6.session.user._id);
      };

      $scope.activate = function(o) {
        $scope.activeObject = o;
      };

      function deleteSomething(type, o) {
        var opt = Modal.confirm.getAskOptions(Modal.types.delete, o.title);
        Modal.show(opt)
          .then(function() {
            ndo6.delete(type, o._id);
          });
      }

      $scope.wayIsActive = function(way) {
        return maps.hasRoute(ndo6.session.context, way._id);
      };

      $scope.pointDelete = function(p) {
        deleteSomething('point', p);
      };

      $scope.wayToggle = function(w) {
        if ($scope.idle) return;
        if ($scope.wayIsActive(w)) {
          maps.clearRoute(ndo6.session.context);
        } else {
          $scope.idle = w._id;
          maps.calcRoute(ndo6.session.context, w)
            .then(function() {
              $scope.idle = null;
              $scope.closeOverpage();
            }, function(err){
              Logger.error(err);
              $scope.idle = null;
            });
        }
      };

      $scope.wayDelete = function(w) {
        deleteSomething('way', w);
      };
    }]);
