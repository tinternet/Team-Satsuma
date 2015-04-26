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
	answer.save();
	//showAnswer( answer );
	
	console.log( question );
	
};
});