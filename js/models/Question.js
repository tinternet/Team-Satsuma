"use strict";
define( [
	"models/ParseObject",
	"models/User",
	"models/Answer",
	"extends"
], function( ParseObject, User, Answer ) {

function Question( category, title, content, author ) {
	ParseObject.call( this, arguments[ 0 ] );
	
	if ( typeof title === "string" && typeof content === "string" &&
			typeof category === "string" && author instanceof User ) {
		this.category = category;
		this.title = title;
		this.content = content;
		this.author = author;
	}
}

Question.extends( ParseObject );

Question.prototype.getAnswers = function() {
	var queryData = {
		"question": this.toPointer()
	};
	
	return Answer.loadAll( "include=author&where=" + JSON.stringify( queryData ) );
};

});