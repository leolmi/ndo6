'use strict';

angular.module('ndo6App')
  .factory('ndo6', ['$q','$location','$timeout','$rootScope','$http','socket','maps','uiUtil','Logger','Position',
    function($q,$location,$timeout,$rootScope,$http,socket,maps,uiUtil,Logger,Position) {
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
            if (m) m.setMap(null);
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
      var _last = new Position();

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

        _last = new Position();
      }

      function setZoom(zoom) {
        if (!zoom || !_session.context) return;
        var listener = _session.context.G.maps.event.addListener(_session.context.map, "idle", function() {
          _session.context.map.setZoom(zoom);
          _session.context.G.maps.event.removeListener(listener);
        });
      }

      /**
       * centra la mappa
       */
      function centerMap(pos, zoom, finder) {
        if (!_session.context || !pos) return;
        // il centro è considerato più in alto per
        // lasciare lo spazio al monitor
        var bounds = _session.context.map.getBounds();
        if (!bounds) return;

        // Calcola le coordinate del centro
        var gpos = maps.getLatLng(_session.context.G, pos);

        // Imposta il centro della mappa
        _session.context.map.setCenter(gpos);

        var mrk = finder ? finder() : null;
        if (mrk) {
          // Se ha trovato il marker lo anima
          mrk.setAnimation(_session.context.G.maps.Animation.BOUNCE);
          $timeout(function () {
            mrk.setAnimation(null);
          }, 1000);
        }
        setZoom(zoom);
      }

      function centerUser(pos, zoom) {
        if (!pos && _last.isValid()) {
          pos = maps.getLatLng(_session.context.G, _last);
        }
        centerMap(pos, zoom);
      }


      function internalCheckInvitation() {
        if ($location.path()=='/map') {
          _session.invitation = $location.hash();
        }
      }

      function checkInvitation() {
        return $q(function(resolve, reject){
          if (!_session.invitation) return resolve();
          $http.get('/api/invitations/' + _session.invitation)
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

      function internalReadPosition() {
        return $q(function(resolve, reject) {
          if (!_options.active) {
            resolve();
          } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject, _options.locationOptions);
          }
          else {
            reject(new Error('Geolocation is not supported by this browser.'));
          }
        });
      }


      /**
       * Legge la posizione corrente
       * @returns {*}
       */
      function readPosition() {
        return $q(function(resolve, reject) {
          internalReadPosition()
            .then(function(pos){
              if (!_session.user || !_session.user.name) return reject();
              var npos = new Position(pos, {
                id: 'user@' + _session.user.email,
                title: _session.user.name,
                label: _session.user.name.slice(0, 1),
                type: 'user'
              });
              _last = _last || new Position();
              if (!_last.sameOf(npos)) {
                _last.keep(npos);
                _last.last = true;
                if (_options.active) {
                  if (_session.map) {
                    $http.post('/api/positions/' + _session.map._id, _last)
                      .then(function() {
                        resolve();
                      }, function(err){
                        reject(err);
                      });
                  } else {
                    if (_options.centerFirst || _options.centerLocked) {
                      _last.center = true;
                      _options.centerFirst = false;
                    }
                    if (_last.isValid()) {
                      uiUtil.addOrReplace(_data.positions, _last, function (p1, p2) {
                        return p1.id == p2.id;
                      }, function (xp, np) {
                        xp.keep(np);
                      });
                    }
                    refreshPositions();
                    resolve();
                  }
                } else {
                  resolve();
                }
              } else {
                resolve();
              }
            }, function(err){
              reject(err);
            });
        });
      }

      function getMarkerIcon(url) {
        if (url) {
          var g = _session.context.G;
          return {
            url: url,
            size: new g.maps.Size(22, 40),
            origin: new g.maps.Point(0, 0),
            anchor: new g.maps.Point(11, 40)
          }
        }
      }

      function getMarker(info) {
        if (!_session.context) return null;
        var latlnt = maps.getLatLng(_session.context.G, info);
        var m = new _session.context.G.maps.Marker({
          map: _session.context.map,
          label: info.label || 'P',
          position: latlnt,
          title: info.title || info.description,
          icon: getMarkerIcon(info.icon)
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

      function debugHandler(resp) {
        var msg = resp.data ? JSON.stringify(resp.data) : 'ok';
        Logger.info(msg);
      }

      function errHandler(err) {
        var msg = _.isObject(err) ? err.message || err.data : err;
        Logger.error('Error', msg);
      }

      function refreshMarkers() {
        _data.clearMarkers();
        //POSITIONS
        _data.positions = _data.positions || [];
        _data.markers = _(_data.positions)
          .filter(function(p){
            return p.last;
          })
          .map(function(p){
            return getMarker(p);
          }).value();
        //POINTS
        _data.points = _data.points || [];
        var pointsm = _.map(_data.points, function(p){
          return getMarker(p);
        });
        _data.markers.push.apply(_data.markers, pointsm);
      }

      function refreshPositions() {
        if (!_session.map) {
          refreshMarkers();
          var c = _.find(_data.positions, function(p){
            return p.center;
          });
          if (c) {
            c.center = false;
            centerMap(c);
          }
        } else {
          $http.get('/api/positions/' + _session.map._id)
            .then(function (resp) {
              _data.positions = resp.data;
              socket.syncUpdates('position', _data.positions, refreshMarkers);
            }, errHandler);
        }
      }



      function refreshShared() {
        if (!_session.map) {
          refreshMarkers();
          _data.messages = [];
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

      function share(type, data) {
        var sharedobj = undefined;
        switch (type) {
          case 'point':
            sharedobj = {
              icon: data.icon,
              label: data.label,
              title: data.title,
              latitude: data.pos.lat(),
              longitude: data.pos.lng()
            };
            break;
          // case 'message':
          //   sharedobj = {
          //     text: data.text,
          //     action: data.action
          //   };
          //   break;
          case 'way':
            sharedobj = {
              title: data.title,
              notes: data.notes,
              mode: data.mode,
              points: data.points
            };
            break;
        }
        if (!sharedobj) return;
        sharedobj.type = type;
        sharedobj.id = type + '@' + uiUtil.guid();
        if (_session.map) {
          $http.post('/api/shared/' + type + '/' + _session.map._id, sharedobj)
            .then(function () {
              Logger.info('Object "' + type + '" shared successfully!');
            }, errHandler);
        }
        else if (type == 'point') {
          _data.points.push(sharedobj);
          refreshShared();
        }
      }

      function getTypeIcon(type) {
        switch(type){
          case 'point': return 'fa-map-marker';
          case 'user': return 'fa-user';
          default: return 'fa-question-circle';
        }
      }

      function deleteShared(type, id) {
        $http.delete('/api/shared/' + type + '/' + id)
          .then(function () {
            Logger.info('Object "' + type + '" deleted successfully!');
          }, errHandler);
      }

      function refresh() {
        refreshPositions();
        refreshShared();
      }


      $rootScope.$watch(function() { return _session.map; }, function(){
        _last = new Position();
        _data.reset();
        refresh();
      });

      internalCheckInvitation();

      return {
        session: _session,
        options: _options,
        data: _data,
        lastPosition: _last,
        centerMap: centerMap,
        centerUser: centerUser,
        reset: reset,
        refresh: refresh,
        replaceOrAdd: replaceOrAdd,
        errHandler: errHandler,
        checkGeo: checkGeo,
        checkInvitation: checkInvitation,
        readPosition: readPosition,
        getMarker: getMarker,
        setMap: setMap,
        deleteMap: deleteMap,
        share: share,
        delete: deleteShared,
        getTypeIcon: getTypeIcon
      }
    }]);
