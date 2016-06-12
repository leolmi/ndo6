'use strict';

angular.module('ndo6App')
  .factory('ndo6', ['$q','$rootScope','$http','socket','uiUtil','Logger',
    function($q,$rootScope,$http,socket,uiUtil,Logger) {
      var _session = {
        user: {},
        map: null,
        context: null
      };
      var _data = {
        maps: [],
        markers: [],
        points: [],
        messages: [],
        ways: [],
        positions: [],
        clearMarkers:function() {
          this.markers.forEach(function(m){
            m.setMap(null);
          });
          this.markers.splice(0);
        },
        reset: function(full) {
          this.clearMarkers();
          this.markers = [];
          this.points = [];
          this.positions = [];
          this.messages = [];
          this.ways = [];
          if (full)
            this.maps = [];
        }
      };
      var _options = {
        active: true,
        delay: 1000,
        centerFirst: true,
        centerLocked: false,
        notify: {
          active: true,
          maps: true,
          points: true,
          messages: true,
          ways: true
        },
        monitor:{
          visible: true
        },
        locationOptions:{
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      };

      function reset(full) {
        _session.user = {};
        _session.map = null;
        _session.context = null;


        _options.active = true;
        _options.delay = 1000;
        _options.centerFirst = true;
        _options.centerLocked = false;
        _options.monitor.visible = true;

        _data.reset(full);
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

      function getMarker(info) {
        var m = new _session.context.G.maps.Marker({
          map: _session.context.map,
          label: info.label || 'P',
          position: info.pos
        });
        m.ndo6 = {
          id: uiUtil.guid()
        };
        _.extend(m.ndo6, info);
        return m;
      }

      function replaceOrAdd(m) {
        var index = -1;
        var exm = _.find(_data.markers, function (xm, xi) {
          index = xi;
          return xm.ndo6.id == m.ndo6.id;
        });
        if (exm) {
          _data.markers.splice(index, 1, m);
          exm.setMap(null);
        } else {
          _data.markers.push(m);
        }
      }

      function errHandler(err) {
        var msg = _.isObject(err) ? err.message || err.data : err;
        Logger.error('Error', msg);
      }

      function refreshMarkers() {
        _data.clearMarkers();
        _data.positions = _data.positions || [];
        _data.markers = _.map(_data.positions, function(p){
          return getMarker(p);
        });
        _data.points = _data.points || [];
        var pointsm = _.map(_data.points, function(p){
          return getMarker(p);
        });
        _data.markers.push.apply(_data.markers, pointsm);
      }

      function readPositions() {
        if (!_session.map) {
          _data.positions = [];
          refreshMarkers();
        } else {
          $http.get('/api/positions/' + _session.map.id)
            .then(function (positions) {
              _data.positions = positions;
              socket.syncUpdates('position', _data.positions, refreshMarkers);
            }, errHandler);
        }
      }

      function readShared() {
        if (!_session.map) {
          _data.positions = [];
          refreshMarkers();
          _data.messages = [];
          _data.ways = [];
        } else {
          $http.get('/api/shared/points/' + _session.map.id)
            .then(function (points) {
              _data.points = points;
              socket.syncUpdates('point', _data.points, refreshMarkers);
            }, errHandler);
          $http.get('/api/shared/messages/' + _session.map.id)
            .then(function (messages) {
              _data.messages = messages;
              socket.syncUpdates('message', _data.messages);
            }, errHandler);
          $http.get('/api/shared/ways/' + _session.map.id)
            .then(function (ways) {
              _data.ways = ways;
              socket.syncUpdates('way', _data.ways);
            }, errHandler);
        }
      }

      function refresh() {
        readPositions();
        readShared();
      }

      $rootScope.$watch(function() { return _session.map; }, function(){
        _data.reset();
        refresh();
      });

      return {
        session: _session,
        options: _options,
        data: _data,
        reset: reset,
        refresh: refresh,
        replaceOrAdd: replaceOrAdd,
        errHandler: errHandler,
        checkGeo: checkGeo,
        readPosition: readPosition,
        getMarker: getMarker
      }
    }]);
