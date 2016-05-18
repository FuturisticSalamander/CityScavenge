var urlParser = require('url');
var rp = require('request-promise');
// var userLocation = require('./locationController');
var GOOGLE_PLACES_API_KEY = process.env.GOOGLEPLACESAPIKEY;
var _ = require('underscore');

if (!process.env.TRAVIS) {
  GOOGLE_PLACES_API_KEY = require(__dirname + '/../config/googleplaces.js');
}

var endpoint = {
  latitude: 0,
  longitude: 0,
};

// Dummy data
var userLocation = {
  latitude: 37.7837731,
  longitude: -122.4090172,
};

var checkpoints = [
  {
    name: 'tacos',
    latitude: 37.783246,
    longitude: -122.409078,
  },
  {
    name: 'Omni Hotel',
    latitude: 37.793120,
    longitude: -122.403178,
  },
  {
    name: 'Hotel Union Square',
    latitude: 37.785872,
    longitude: -122.407731,
  },
];

var radius = 3200;

var PlacesObj = function (googlePlacesData) {
  return {
    name: googlePlacesData.name,
    googlePlaceId: googlePlacesData['place_id'],
    latitude: googlePlacesData['geometry']['location']['lat'],
    longitude: googlePlacesData['geometry']['location']['lng'],
    rating: Math.round(googlePlacesData.rating),
  };
};

module.exports.searchGoogle = function (req, res) {
  var responseBody = {};
  responseBody.places = [];

  rp.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
      + '&location=' + userLocation.latitude + ',' + userLocation.longitude
      + '&radius=' +  3200
      + '&key=' + GOOGLE_PLACES_API_KEY
      + '&types=' + 'park|bar|restaurant|cafe|point_of_interest|natural_feature'
    )
    .then(function (body) {
      // parse the data
      var data = JSON.parse(body);
      // check that there is data
      if (data.results && data.results.length > 4 ) {
        // randomly pick a location
        var allCheckpoints = [];
        var storeValues = {};
        while (allCheckpoints.length < 4) {
          var rand = Math.floor(Math.random() * data.results.length);
          // check for duplicate places
          if (!storeValues[rand]) {
            storeValues[rand] = 1;
            allCheckpoints.push(PlacesObj(data.results[rand]));
          }
        }
        // set finish point as first location in array
        endpoint.latitude = allCheckpoints[0].latitude;
        endpoint.longitude = allCheckpoints[0].longitude;
        res.json(allCheckpoints);
      }
    })
    .catch(function (err) {
      console.log('google places API call failure', err);
    })
};

module.exports.getDistance = function (req, res) {
  // this function will run every time a user uploads a picture
  // loop through checkpoints in req.body
  // check if lat and long === req.body.currentUser
  // if so return true and checkpoint that collided
  // return false
  var currentCheckpoints = req.body.checkpoints;
  var currentUser = req.body.currentUser;
  var collision = {collided: false};
  for (var i = 0; i < currentCheckpoints.length; i++) {
    var thisCheckpoint = currentCheckpoints[i];
    //if (currentCheckpoints[i].lat === currentUser.lat && currentCheckpoints[i].lng === currentUser.lng) {
      rp.get('https://maps.googleapis.com/maps/api/distancematrix/json?'
        + 'units=imperial'
        + '&origins=' + currentCheckpoints[i].lat + ',' + currentCheckpoints[i].lng
        + '&destinations=' + currentCheckpoints[i].lat + '%2C' + currentCheckpoints[i].lng
        + '&key=' + GOOGLE_PLACES_API_KEY
      )
      .catch(function (err) {
        console.log('Google Distance Matrix API call failure', err);
      })
      .then(function (body) {
        if (JSON.parse(body).rows[0].elements[0].distance.value <= 2000) {
          collision.collided = true;
          collision['checkpoint'] = thisCheckpoint;
          console.log('You win!');
          res.json(collision);
        }
      });
    //}
  }
  console.log(collision);
  //res.json(collision);
};
