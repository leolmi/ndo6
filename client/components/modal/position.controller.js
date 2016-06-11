'use strict';

angular.module('ndo6App')
  .controller('PositionCtrl', ['$scope', function ($scope) {
    $scope.pos = 'latitude: '+$scope.modal.context.pos.lat()+ '\nlongitude: '+$scope.modal.context.pos.lng();
    var geocoder = google ? new google.maps.Geocoder() : undefined;
    if (geocoder) {
      $scope.geocoding = true;
      geocoder.geocode({'location': $scope.modal.context.pos}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            $scope.result = results[0].formatted_address; // + '\n' + results[1].formatted_address;
            $scope.modal.context.description = $scope.modal.context.description || results[1].formatted_address;
          } else {
            $scope.error = 'No results found';
          }
        } else {
          $scope.error = 'Geocoder failed due to: ' + status;
        }
        $scope.geocoding = false;
      });
    }

    //TODO:
    // - pulsante: aggiungi marker
    // - scelta colore


  }]);
