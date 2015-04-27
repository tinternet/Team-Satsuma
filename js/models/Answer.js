"use strict";
define( [
	"models/ParseObject",
	"models/User",
	"models/Question",
	"models/Exceptions",
	"helpers/extends"
], function( ParseObject, User, Question, Exception ) {

function Answer( content, question ) {
	ParseObject.call( this, arguments[0] );

	if ( typeof content === "string") {
		if ( content.isEmpty() ) {
			throw Exception.emptyFieldException( "The answer content is empty!" );
		} else {
			this.content = content;
		}

		this.question = question;
	}
}

Answer.extends( ParseObject );

return Answer;

});