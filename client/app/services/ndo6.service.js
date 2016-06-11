'use strict';

angular.module('ndo6App')
  .factory('ndo6', ['$q',
    function($q) {
      var _session = {
        user: {},
        map: null,
        context: null
      };
      var _options = {
        active: true,
        delay: 1000,
        center: false,
        centerFirst: true,
        centerLocked: false,
        markers: [],
        monitor:{
          visible: true
        },
        locationOptions:{
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        },
        clearMarkers:function() {
          this.markers.forEach(function(m){
            m.setMap(null);
          });
          this.markers.splice(0);
        }
      };

      function reset() {
        _session.user = {};
        _session.map = null;
        _session.context = null;

        _options.active = true;
        _options.delay = 1000;
        _options.centerFirst = true;
        _options.centerLocked = false;
        _options.monitor.visible = true;
        _options.clearMarkers();
      }

      function checkGeo() {
        return $q(function(resolve, reject){
          if (!navigator.geolocation)
            return reject('Geolocation is not supported by this browser.');
          navigator.geolocation.getCurrentPosition(function() {
            resolve();
          }, function() {
            reject('Geolocation is not activated.');
          });
        });
      }

      function readPosition() {
        if (!_options.active) return;
        return $q(function(resolve, reject) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject, _options.locationOptions);
          }
          else {
            reject(new Error('Geolocation is not supported by this browser.'));
          }
        });
      }

      return {
        session: _session,
        options: _options,
        reset: reset,
        checkGeo:checkGeo,
        readPosition:readPosition
      }
    }]);
