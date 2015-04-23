/*
	Extends ParseObject
	
	Prototype methods:
		* getAnswers() - Returns all answers for this question as promise.
		
	Static methods:
		* getById( id ) - Accepts id as first parameter.
			Calling this method will increase question views count by 1.
			Returns promise...
*/
"use strict";
define( [
	"models/ParseObject",
	"models/User",
	"models/Answer",
	"models/Exceptions",
	"parseDotComHeader",
	"extends"
], function( ParseObject, User, Answer, Exception, parseHeader ) {

function Question( category, title, content, author, tags ) {
	ParseObject.call( this, arguments[ 0 ] );
	
	// We don`t handle server response here
	if ( typeof arguments[ 0 ] === "object" ) {
		return this;
	}
	
	if ( title.isEmpty() ) {
		throw Exception.emptyFieldException( "Question title cannot be empty value!" );
	}
	
	if ( content.isEmpty() ) {
		throw Exception.emptyFieldException( "Question content cannot be empty value!" );
	}
	
	if ( category.isEmpty() ) {
		throw Exception.emptyFieldException( "Please specify question category!" );
	}
	
	if ( !( author instanceof User ) ) {
		throw Exception.emptyFieldException( "Author must be User model instance!" );
	}

	this.category = category;
	this.title = title;
	this.content = content;
	this.author = author;
	this.tags = tags || [];
}

Question.extends( ParseObject );

Question.prototype.getAnswers = function() {
	var queryData = {
		"question": this.toPointer()
	};
	
	return Answer.loadAll( "include=author&where=" + JSON.stringify( queryData ) );
};

Question.getById = function( id ) {
	if ( id.isEmpty() ) {
		throw Error( "Cannot load question without id!" );
	}
	
	return $.ajax({
		method: "POST",
		url: "https://api.parse.com/1/function/viewQuestion"
		data: JSON.stringify( { id: id } ),
		headers: parseHeader,
		context: this
	});
};

return Question;

});