var apiKey = 'AIzaSyB463ZZB0c6TzyRMULH5xZ4SGRRmMUA5hw';
// allFlights = {};
results = [];

if (Meteor.isClient) {
  Session.set('searching',true);
  HTTP.call( 'POST', 'https://www.googleapis.com/qpxExpress/v1/trips/search?key='+apiKey,{
    data: {
      "request": {
        "slice": [
          {
            "origin": "SFO",
            "destination": "LAX",
            "date": "2016-02-14"
          }
        ],
        "passengers": {
          "adultCount": 1,
          "infantInLapCount": 0,
          "infantInSeatCount": 0,
          "childCount": 0,
          "seniorCount": 0
        },
        "solutions": 5,
        "refundable": false
      }
    }
  }, function( error, response ) {
    if ( error ) {
      console.log( error );
      Session.set('searching',false);
    } else {
      _.each(response.data.trips.tripOption, function(trip){
        var flight = {
          price: trip.saleTotal,
          duration: trip.slice[0].duration,
          carrier: trip.slice[0].segment[0].flight.carrier,
          number: trip.slice[0].segment[0].flight.number
        }
        results.push(flight);
        Session.set('searching',false);
      })
    }
  });

  // Tracker.autorun(function() {  
  //   if (allFlights) {
  //     var searchHandle = Meteor.subscribe('booksSearch', Session.get('query'));
  //     Session.set('searching', ! searchHandle.ready());
  //   }
  // });

  Template.body.helpers({
    results: results,
    searching: function(){
      return Session.get('searching');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
