var apiKey = 'AIzaSyB463ZZB0c6TzyRMULH5xZ4SGRRmMUA5hw';
allFlights = {};

if (Meteor.isClient) {
  HTTP.call( 'POST', 'https://www.googleapis.com/qpxExpress/v1/trips/search?key='+apiKey,{
    data: {
      "request": {
        "slice": [
          {
            "origin": "SFO",
            "destination": "LAX",
            "date": "2016-01-29"
          }
        ],
        "passengers": {
          "adultCount": 1,
          "infantInLapCount": 0,
          "infantInSeatCount": 0,
          "childCount": 0,
          "seniorCount": 0
        },
        "solutions": 20,
        "refundable": false
      }
    }
  }, function( error, response ) {
    if ( error ) {
      console.log( error );
    } else {
      allFlights = response.data.trips;
      console.log( response );
    }
  });

  Template.body.helpers({
    flights : [allFlights.tripOption]
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
