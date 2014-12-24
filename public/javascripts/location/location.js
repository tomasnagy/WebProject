/**
 * Created by tomasnagy on 15/12/14.
 */
function getLocation(callback) {
    if (navigator.geolocation && navigator.geolocation.getCurrentPosition) {
        navigator.geolocation.getCurrentPosition(function(data) {
            var geocoder = new google.maps.Geocoder(),
                latlng = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
            geocoder.geocode({'latLng': latlng}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        //formatted address
                        //alert(results[0].formatted_address)
                        //find country name
                        callback(results[1].address_components[1].long_name);
                        //city data
                        //alert(city.short_name + " " + city.long_name)


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
            // if error throw space
            callback('Space');
        });
    } else {
        callback('Space');
        console.log("Geolocation is not supported by this browser.");
    }
}