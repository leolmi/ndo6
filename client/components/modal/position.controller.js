'use strict';

angular.module('ndo6App')
  .controller('PositionCtrl', ['$scope', function ($scope) {
    //TODO: mostra la finestra di gestione della posizione rilevata.
    $scope.pos = {
      latitude: $scope.modal.context.pos.lat().toFixed(8),
      longitude: $scope.modal.context.pos.lng().toFixed(8)
    };
    
    var geocoder = google ? new google.maps.Geocoder() : undefined;

    if (geocoder) {
      $scope.geocoding = true;
      geocoder.geocode({'location': $scope.modal.context.pos}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            $scope.result = results[1].formatted_address;
          } else {
            $scope.error = 'No results found';
          }
        } else {
          $scope.error = 'Geocoder failed due to: ' + status;
        }
        $scope.geocoding = false;
      });
    }

  }]);
