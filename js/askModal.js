/*
 * Controlls the behaviour of the ask modal
 */

"use strict";
define( [
	"models/User",
	"text!template/ask-modal.html",
	"models/Question",
	"modalReset"
], function( User, askModalTemplate, Question ) {
	
$( "body" ).append( askModalTemplate );
	
$( "#ask-form" ).on( "submit", function( e ) {
	e.preventDefault();
	e.stopPropagation();
	
	var formData = $( this ).serializeArray(),
		question = new Question();
		
	formData.forEach(function( data ) {
		question[ data.name ] = data.value;
		
		if ( data.name === "tags" ) {
			var tags = data.value.split( "," );
			question[ data.name ] = tags;
		}
	});
	
	question.save().done(function() {
		$( "#ask-modal" ).modal( "hide" );
	});
});
});