
// By Full address
// var sampleRequestUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=59+St+Anthony+Ct,+Seabrook,+VIC,+AU&key=AIzaSyCBXRmb4118FJiG-rFOqRqLXyhPyrBIHsk';

// By city name only
var sampleRequestUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=Sydney&key=AIzaSyCBXRmb4118FJiG-rFOqRqLXyhPyrBIHsk';

function getLatLong() {
    var requestUrl = sampleRequestUrl;
    var proceedAfterFirstCall = true;
    fetch(requestUrl)
        .then(function (response) {
            if (response.status === 200) {
                return response.json();
            }
            else {
                proceedAfterFirstCall = false;
                return [];
            }
        }).then(function (results) {
            if (proceedAfterFirstCall) {
                $('#googleAPIRequest').text('Request URL: \n' + requestUrl);
                $('#googleAPIResponse').text('Response: \n' + JSON.stringify(results));
            }
            else {
                $('#googleAPIResponse').text('Call for lat long failed.');
    
            }

        });
};

$(document).ready(function (event) {
    getLatLong();
});
