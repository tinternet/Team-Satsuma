"use strict";
define( [
	"models/ParseObject",
	"models/User",
	"models/Answer",
	"models/Exceptions",
	"extends"
], function( ParseObject, User, Answer, Exception ) {

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

return Question;

});