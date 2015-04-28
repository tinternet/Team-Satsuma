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

Question.prototype.beforeSave = function() {
	if ( this.category.isEmpty() ||
			this.title.isEmpty() ||
			this.content.isEmpty() ) {
		throw Exception.emptyFieldException();
	}
	
	if ( !( tags instanceof Array ) ) {
		throw TypeError( "Question tags field should be instance of array!" );
	}
	
	// Sanitize data
	
	this.category = this.category.trim();
	this.title = this.title.trim();
	this.content = this.content.trim();
	
	this.tags.forEach(function( tag, index, arr ) {
		arr[ index ] = tag.trim();
	});
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