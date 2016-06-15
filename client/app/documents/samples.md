```javascript
var geocoder = new google.maps.Geocoder();
var infowindow = new google.maps.InfoWindow();
```

Esempio geocoder:

by address
```javascript
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
```

by latlng
```javascript
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        map.setZoom(11);
        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        });
        infowindow.setContent(results[1].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
```


Azione dopo eventuale stato "idle" della mappa:
```javascript
map.fitBounds(bounds);
var listener = google.maps.event.addListener(map, "idle", function() { 
  if (map.getZoom() > 16) map.setZoom(16); 
  google.maps.event.removeListener(listener); 
});
```
