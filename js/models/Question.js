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

var MAX_TITLE_LENGTH = 100,
	MAX_CONTENT_LENGTH = 500,
	MAX_TAG_LENGTH = 30;
	
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
	// Sanitize data
	
	this.category = this.category.trim();
	this.title = this.title.trim();
	this.content = this.content.trim();
	
	if ( this.title.length > MAX_TITLE_LENGTH ) {
		throw Error( "Maximum question title length is " + MAX_TITLE_LENGTH + " symbols" );
	}
	
	if ( this.content.length > MAX_CONTENT_LENGTH ) {
		throw Error( "Maximum question content length is " + MAX_CONTENT_LENGTH + " symbols" );
	}
	
	if ( this.category.isEmpty() || this.title.isEmpty() || this.content.isEmpty() || this.tags.length === 0 ) {
		throw Error( "Cannot post with empty fields!" );
	}
	
	this.tags.forEach(function( tag, index, arr ) {
		arr[ index ] = tag.trim();
		
		if ( arr[ index ].length > MAX_TAG_LENGTH ) {
			throw Error( "Maximum tag length is " + MAX_TAG_LENGTH + " symbols" );
		}
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

Question.MAX_TITLE_LENGTH = MAX_TITLE_LENGTH;
Question.MAX_CONTENT_LENGTH = MAX_CONTENT_LENGTH;
Question.MAX_TAG_LENGTH = MAX_TAG_LENGTH;

return Question;

});