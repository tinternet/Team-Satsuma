"use strict";
define( [
	"models/ParseObject",
	"models/User",
	"models/Question",
	"models/Exceptions",
	"extends"
], function( parseObject, User, Question, Exception ) {

function Answer( content, author, question ) {
	ParseObject.call( this, arguments[0] );

	if ( typeof content === "string" && author instanceof User ) {
		if ( content.isEmpty() ) {
			throw Exception.emptyFieldException( "The answer content is empty!" );
		} else {
			this.content = content;
		}

		this.author = author;
		this.question = question;
	}
}

Answer.extends( ParseObject );
});