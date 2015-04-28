
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define( "viewQuestion", function( request, response ) {
	Parse.Cloud.useMasterKey();
	
	var questions = new Parse.Query( "Question" );
	
	questions.include( "author" );
	
	questions.get( request.params.id, {
		success: function( question ) {
			var viewsCount = question.get( "viewsCount" ) || 0;
			
			question.set( "viewsCount", ++viewsCount );
			question.save( null, {
				success: response.success,
				error: response.error
			});
		},
		error: function( obj, err ) {
			response.error( err );
		}
	});
});

Parse.Cloud.afterSave( Parse.User, function( request ) {
	Parse.Cloud.useMasterKey();  

	var query = new Parse.Query(Parse.Role);
	query.equalTo( "name" , "users" );
	query.first ( {
    success: function(object) {

      object.relation("users").add(request.user);

      object.save();


    },
    error: function(error) {
      throw "Got an error " + error.code + " : " + error.message;
    }
  });
});