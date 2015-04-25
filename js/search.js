/*
 * Controlls the behaviour of the search form
 */
"use strict";
define([
	"models/Question",
	"text!template/search-results.html",
	"extends"
], function( Question, searchResultsTemplate ) {

function search( e ) {
	e.preventDefault();
		
	var searchedText = $("#search-input").val().trim();
	
	if ( searchedText.isEmpty() ) {
		return;
	}
	
	var params = {
		where: {
			tags: searchedText
		}
	};
	
	Question.loadAll( params )
		.done( function( response ) {
			var template = Handlebars.compile( searchResultsTemplate );
			var html = template( response );
			
			$('#main-container-heading').text("Results for: " + searchedText);
			$('#main-container').empty().append( html );
		})
		.fail(function( err ) {
			console.error( err ); // Debug only
		});
}

$( "#main-navbar-collapse form[role='search']" )
	.on( "submit", search )

	// Make a hint for the user
	.find( "input" )
	.on( "focus", function() {
		$( this ).attr( "placeholder", "Hint: you can search by #tag" );
	});
});