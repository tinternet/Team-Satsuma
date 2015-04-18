"use strict";
define( [
	"models/ParseObject",
	"models/User",
	"models/Answer",
	"extends"
], function( ParseObject, User ) {

function Question( title, content, author ) {
	ParseObject.call( this, arguments[ 0 ] );
	
	if ( typeof title === "string" && typeof content === "string" &&
			author instanceof User ) {
		this.title = title;
		this.content = content;
		this.author = author;
	}
}

Question.extends( ParseObject );

Question.prototype.save = function( sessionToken ) {
	var author = this.author,
		deferred = $.Deferred();
	
	// Change the author property to pointer
	// We want to send this property as parse.com pointer type
	this.author = this.author.toPointer();
	
	ParseObject
		.prototype
		.save
		.call( this, sessionToken )
		.done(function() {
			// Bring back the model instance
			this.author = author;
			deferred.resolveWith( this );
		})
		.fail( deferred.reject );
		
	return deferred.promise();
};

Question.prototype.getAnswers = function() {
	var queryData = {
		"question": this.toPointer()
	};
	
	return Answer.loadAll( "where=" + JSON.stringify( queryData ) );
};

});