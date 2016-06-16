/* Created by Leo on 15/08/2015. */
'use strict';

angular.module('ndo6App')
  .factory('maps', ['$q','$location','$timeout',
    function($q,$location,$timeout) {
      var _standardIcons = [{
        color: 'blue'
      }, {
        color: 'cyan'
      }, {
        color: 'gold'
      }, {
        color: 'green'
      }, {
        color: 'grey'
      }, {
        color: 'purple'
      }, {
        color: 'red'
      }, {
        color: 'violet'
      }];

      function getIcon(color) {
        var icon = _.find(_standardIcons, function (i) {
          return i.color == color;
        });
        return icon ? $location.absUrl() + 'assets/markers/marker-' + icon.color + '.png' : undefined;
      }

      function getOptions(G) {
        return {
          zoom: 14,
          center: new G.maps.LatLng(43.7681469, 11.2527254),
          mapTypeId: G.maps.MapTypeId.ROADMAP
        };
      }

      /**
       * Genera la mappa
       * @param G
       * @param {function} center
       * @param {function} cb
       * @param {string} [dommap]
       * @param {string} [domfinder]
       * @param {object} [o]
       * @returns {context}
       */
      function createContext(G, center, cb, dommap, domfinder, o) {
        o = o || getOptions(G);
        cb = cb || angular.noop;
        dommap = dommap || 'map-canvas';
        domfinder = domfinder || 'map-finder';
        var context = {
          options: o,
          G: G,
          map: new G.maps.Map(document.getElementById(dommap), o),
          directionsService: new G.maps.DirectionsService,
          directionsDisplay: new G.maps.DirectionsRenderer,
          searchBox: {}
        };

        // Crea il box per la ricerca e lo sincronizza con la mappa
        var input = document.getElementById(domfinder);
        context.searchBox = new G.maps.places.SearchBox(input);
        context.map.controls[G.maps.ControlPosition.TOP_LEFT].push(input);
        context.directionsDisplay.setMap(context.map);
        context.map.addListener('bounds_changed', function () {
          context.searchBox.setBounds(context.map.getBounds());
        });
        context.searchBox.addListener('places_changed', function () {
          var places = context.searchBox.getPlaces();
          if (places.length == 0 || !center) return;
          center(places[0].geometry.location);
        });

        G.maps.event.addListenerOnce(context.map, 'idle', function () {
          cb(context);
        });
        return context;
      }

      /**
       * Informazioni per il calcolo del percorso
       * @param context
       * @param origin
       * @param destination
       * @param [waypts]
       * @param [mode]
       * @returns {{origin: *, destination: *, waypts: *, mode: *}}
       */
      function routeInfo(context, origin, destination, waypts, mode) {
        mode = mode || context.G.maps.TravelMode.DRIVING;
        if (typeof mode == 'string') {
          switch (mode) {
            case 'walk':
              mode = context.G.maps.TravelMode.WALKING;
              break;
            case 'car':
              mode = context.G.maps.TravelMode.DRIVING;
              break;
            case 'public':
              mode = context.G.maps.TravelMode.TRANSIT;
              break;
            case 'bicycle':
              mode = context.G.maps.TravelMode.BICYCLING;
              break;
          }
        }
        waypts = waypts || [];
        return {
          origin: origin,
          destination: destination,
          waypts: waypts,
          mode: mode
        }
      }

      /**
       * Restituisce un latlng
       * @param G
       * @param pos
       * @returns {G.maps.LatLng}
       */
      function getLatLng(G, pos) {
        G = G || google;
        if (pos) {
          var lat = pos.latitude ? pos.latitude : (pos.G ? pos.G : (_.isFunction(pos.lat) ? pos.lat() : undefined));
          var lng = pos.longitude ? pos.longitude : (pos.K ? pos.K : (_.isFunction(pos.lng) ? pos.lng() : undefined));
          return new G.maps.LatLng(lat, lng);
        }
      }

      function getRouteMode(context, mode) {
        switch (mode){
          case 'walk': return context.G.maps.TravelMode.WALKING;
          case 'public': return context.G.maps.TravelMode.TRANSIT;
          case 'bicycle': return context.G.maps.TravelMode.BICYCLING;
          default: return context.G.maps.TravelMode.DRIVING;
        }
      }

      /**
       * Calcola il percorso
       * @param {object} context
       * @param {object} info
       * @param [cb]
       */
      function calcRoute(context, info) {
        return $q(function(resolve, reject){
          if (!info || !info.points || info.points.length<2)
            return reject('Invalid route info!');

          var start = info.points.shift();
          var end = info.points.pop();
          var waypts = _.map(info.points, function(p){
            return {
              location: getLatLng(context.G, p),
              stopover: false
            };
          });

          context.directionsService.route({
            origin: getLatLng(context.G, start),
            destination: getLatLng(context.G, end),
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: getRouteMode(context, info.mode)
          }, function (response, status) {
            if (status === context.G.maps.DirectionsStatus.OK) {
              context.route = response.routes[0];
              context.route.ndo6 = info;
              context.directionsDisplay.setDirections(response);
              resolve();
            } else {
              reject('Directions request failed due to ' + status);
            }
          });
        });
      }

      /**
       * Cancella il percorso calcolato
       * @param context
       */
      function clearRoute(context) {
        context.route = null;
        if (context.directionsDisplay)
          context.directionsDisplay.setMap(null);
        context.directionsDisplay = new context.G.maps.DirectionsRenderer;
        context.directionsDisplay.setMap(context.map);
      }

      function hasRoute(context, id) {
        return (context && context.route && context.route.ndo6 && (!id || context.route.ndo6._id == id));
      }

      function getRouteInfos(context) {
        var result = {
          way: null,
          info: '',
          details: []
        };
        if (context && context.route && context.route.ndo6) {
          result.way = context.route.ndo6;
          var l = context.route.legs[0];
          var infos = [];
          infos.push('From: ' + l.start_address);
          infos.push('To: ' + l.end_address);
          infos.push('');
          infos.push('Duration: ' + l.duration.text);
          infos.push('Distance: ' + l.distance.text);
          result.info = infos.join('\n');
          l.steps.forEach(function (s, i) {
            result.details.push({
              distance: s.distance.text,
              duration: s.duration.text,
              instructions: s.instructions
            });
          });
        }
        return result;
      }

      return {
        standardIcons: _standardIcons,
        getIcon: getIcon,
        getLatLng: getLatLng,
        getOptions: getOptions,
        createContext: createContext,
        routeInfo: routeInfo,
        hasRoute: hasRoute,
        calcRoute: calcRoute,
        clearRoute: clearRoute,
        getRouteInfos: getRouteInfos
      }
    }]);
