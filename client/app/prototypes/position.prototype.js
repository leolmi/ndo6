'use strict';

angular.module('ndo6App')
  .factory('Position', [function() {

    var Position = function(info) {
      this.keep(info);
    };
    Position.prototype = {
      latitude: null,
      longitude: null,
      altitude: null,
      accuracy: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
      timestamp: null,
      sameOf:function(pos) {
        return pos.latitude == this.latitude &&
          pos.longitude == this.longitude &&
          pos.altitude == this.altitude;
      },
      keep: function(pos) {
        if (!pos) return;
        if (pos.timestamp)
          this.timestamp = pos.timestamp;
        if (pos.coords) pos = pos.coords;
        this.latitude = pos.latitude;
        this.longitude = pos.longitude;
        this.altitude = pos.altitude;
        this.accuracy = pos.accuracy;
        this.altitudeAccuracy = pos.altitudeAccuracy;
        this.heading = pos.heading;
        this.speed = pos.speed;
      }
    };

    return (Position);
  }]);
