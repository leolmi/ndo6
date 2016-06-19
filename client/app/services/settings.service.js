/* Created by Leo on 16/06/2016. */
'use strict';

angular.module('ndo6App')
  .factory('settings', ['$q','$rootScope','Auth',
    function($q,$rootScope,Auth) {
      var _idle = false;
      var _settings = {};

      function reset() {
        _idle = true;
        _settings.user = '';
        _settings.map = '';
        _settings.shared = {
          ways: true,
          points: true,
          positions: true
        };
        _idle = false;
      }

      function load() {
        reset();
        _idle = true;
        if (typeof(Storage)!=='undefined') {
          Auth.isLoggedInAsync(function() {
            var u =Auth.getCurrentUser();
            console.log('carica i settings per l\'utente:' + JSON.stringify(u));
            if (u && u.email) {
              _settings.user = u.email;
              var settings = localStorage.getItem('NDO6-SETTINGS-' + u.email);
              if (settings) {
                var s = JSON.parse(settings);
                if (s) {
                  _settings.map = s.map;
                  _.extend(_settings.shared, s.shared);
                }
              }
            }
          });
        }
        _idle = false;
      }

      function save() {
        if (typeof(Storage)!=='undefined' && _settings.user) {
          console.log('salva i settings: '+JSON.stringify(_settings));
          localStorage.setItem('NDO6-SETTINGS-' + _settings.user, JSON.stringify(_settings));
        }
      }

      $rootScope.$watch(function() { return _settings; }, function() {
        if (!_idle) save();
      }, true);

      $rootScope.$on('CURRENT-MAP-CHANGED', function(e, map) {
        _settings.map = map;
      });

      $rootScope.$on('USER-LOGIN', function() {
        load();
      });
      $rootScope.$on('USER-LOGOUT', function() {
        reset();
      });

      load();
      return {
        data:_settings
      }
    }]);
