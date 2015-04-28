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

	if ( typeof arguments[ 0 ] === "object" ) {
		return this;
	}
	
	this.question = question;
	this.content = content;
}

Answer.extends( ParseObject );

return Answer;

});