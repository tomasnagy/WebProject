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
                    console.log(results)
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
};

//function showError(error) {
//    switch(error.code) {
//        case error.PERMISSION_DENIED:
//            console.log("User denied the request for Geolocation.");
//            break;
//        case error.POSITION_UNAVAILABLE:
//            console.log("Location information is unavailable.");
//            break;
//        case error.TIMEOUT:
//            console.log("The request to get user location timed out.");
//            break;
//        case error.UNKNOWN_ERROR:
//            console.log("An unknown error occurred.");
//            break;
//    }
//}

function codeLatLng(lat, lng) {


}