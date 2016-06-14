'use strict';

angular.module('ndo6App')
  .factory('ndo6', ['$q','$location','$rootScope','$http','socket','uiUtil','Logger',
    function($q,$location,$rootScope,$http,socket,uiUtil,Logger) {
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
      var _shared = [{
        name:'points',
        socketName: 'point',
        cb: refreshMarkers
      },{
        name:'messages',
        socketName: 'message'
      },{
        name:'ways',
        socketName: 'way'
      }];

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

      function invite() {
        if ($location.path()=='/map') {
          _session.invite = $location.hash();
        }
      }

      function checkInvite() {
        return $q(function(resolve, reject){
          if (!_session.invite) return resolve();
          $http.get('/api/invitations/' + _session.invite)
            .then(function (resp) {
              resolve(resp.data);
            }, function(err){
              if (err.data) console.log(err.data);
              resolve();
            });
        });
      }

      function checkGeo() {
        return $q(function (resolve, reject) {
          if (!navigator.geolocation)
            return reject('Geolocation is not supported by this browser.');
          navigator.geolocation.getCurrentPosition(function () {
            resolve();
          }, function () {
            reject('Geolocation is not available.');
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
          position: info.pos,
          title: info.title || info.description,
          icon: info.icon
        });
        m.ndo6 = {
          id: uiUtil.guid()
        };
        _.extend(m.ndo6, info);
        _session.context.G.maps.event.addListener(m, 'click', function() {
          if (m.map) $rootScope.$broadcast('CLICK-ON-MARKER', m);
        });
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
          $http.get('/api/positions/' + _session.map._id)
            .then(function (resp) {
              _data.positions = resp.data;
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
          _shared.forEach(function(s){
            $http.get('/api/shared/'+s.name+'/' + _session.map._id)
              .then(function (resp) {
                _data[s.name] = resp.data;
                socket.syncUpdates(s.socketName, _data[s.name], s.cb);
              }, errHandler);
          });
        }
      }

      function setMap(map) {
        return $q(function (resolve, reject) {
          function internalSetMap(map) {
            if (map && map.invite)
              map.invite.accepted = true;
            _session.map = map;
            resolve();
          }
          if (!map  || !map.invite || map.invite.accepted) {
            internalSetMap(map);
          } else {
            $http.post('/api/invitations/accept', map.invite)
              .then(function () {
                internalSetMap(map);
              }, errHandler);
          }
        });
      }

      function deleteMap(map) {
        if (map.invite) {
          $http.post('/api/invitations/refuse', map.invite)
            .then(function () {
              Logger.info('Invitation refused!')
            }, errHandler);
        } else {
          $http.delete('/api/map/'+map._id)
            .then(function () {
              Logger.info('Map deleted successfully!')
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

      invite();

      return {
        session: _session,
        options: _options,
        data: _data,
        reset: reset,
        refresh: refresh,
        replaceOrAdd: replaceOrAdd,
        errHandler: errHandler,
        checkGeo: checkGeo,
        checkInvite: checkInvite,
        readPosition: readPosition,
        getMarker: getMarker,
        setMap: setMap,
        deleteMap: deleteMap
      }
    }]);
