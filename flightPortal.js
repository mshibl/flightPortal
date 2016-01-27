if (Meteor.isClient) {
  HTTP.call( 'GET', 'http://jsonplaceholder.typicode.com/posts', {}, function( error, response ) {
    if ( error ) {
      console.log( error );
    } else {
      console.log( response );
      /*
       This will return the HTTP response object that looks something like this:
       {
         content: "String of content...",
         data: Array[100], <-- Our actual data lives here. 
         headers: {  Object containing HTTP response headers }
         statusCode: 200
       }
      */
    }
  });

  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
