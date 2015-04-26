"use strict";
define([
	"models/Answer",
	"models/User",
	"models/Question"
], function( Answer, User, Question ) {
return function postComment( data, question, showAnswer ) {
	
	
	
	/*
	 * 
	 * TODO: Add logic ...
	 * 
	 * Call showAnswer with the answer instance as argument to tell the controller
	 * that our job is done.
	 * 
	 * showAnswer( answer );
	 * 
	 */

	var content = data[0].value,
		author = User.getCurrent();

	var answer = new Answer( content, author, question );
<<<<<<< HEAD
=======

>>>>>>> 2e24cac57be0aa1cc8e09e133a5c51a6522b5aca
	answer.save();
	//showAnswer( answer );
	
	console.log( question );
	
};
});