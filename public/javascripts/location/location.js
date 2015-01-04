/**
 * Created by tomasnagy on 15/12/14.
 */
// function tries to get city from user, if anything goes wrong it returns 'Space' so it can continue
function getLocation(callback) {
    'use strict';
    if (navigator.geolocation && navigator.geolocation.getCurrentPosition) {
        navigator.geolocation.getCurrentPosition(function(data) {
            var geocoder = new google.maps.Geocoder(),
                latlng = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
            geocoder.geocode({'latLng': latlng}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        // this should be city
                        callback(results[1].address_components[1].long_name);
                    } else {
                        // No results found
                        callback('Space');
                    }
                } else {
                    // geodecoder failure
                    callback('Space');
                }
            });
        }, function(error) {
            // if error send user to space
            callback('Space');
        });
    } else {
        callback('Space');
    }
}