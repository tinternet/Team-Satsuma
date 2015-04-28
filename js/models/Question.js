/*
	Extends ParseObject
	
	Prototype methods:
		* getAnswers() - Returns all answers for this question as promise.
		
	Static methods:
		* getById( id ) - Makes get request and accepts id as first parameter.
			Calling this method will increase question views count by 1.
			Returns promise for the request.
*/
"use strict";
define( [
	"models/ParseObject",
	"models/User",
	"models/Answer",
	"models/Exceptions",
	"parseDotComHeader",
	"helpers/extends"
], function( ParseObject, User, Answer, Exception, parseHeader ) {

function Question( category, title, content, tags ) {
	ParseObject.call( this, arguments[ 0 ] );
	
	// We don`t handle server response here
	if ( typeof arguments[ 0 ] === "object" ) {
		return this;
	}

	this.category = category;
	this.title = title;
	this.content = content;
	this.viewsCount = 0;
	this.tags = tags || [];
}

Question.extends( ParseObject );

Question.prototype.getAnswers = function() {
	var queryData = {
		include: "author",
		where: {
			question: this.toPointer()
		}
	};
	
	return Answer.loadAll( queryData );
};

Question.getById = function( id ) {
	if ( id.isEmpty() ) {
		throw Error( "Cannot load question without id!" );
	}
	
	return $.ajax({
		method: "POST",
		url: "https://api.parse.com/1/functions/viewQuestion",
		data: { id: id },
		headers: parseHeader,
		context: this
	})
	.done(function( response ) {
		response.question = new Question( response.result );
	});
};

return Question;

});