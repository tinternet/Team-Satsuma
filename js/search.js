"use strict";
define(function() {
	
$( "#main-navbar-collapse form[role='search']" )
	.on( "submit", function( e ) {
		e.preventDefault();
		
		// TODO: Add search logic here...
	})
	
	// Make a hint for the user
	.find( "input" )
	.on( "focus", function() {
		$( this ).attr( "placeholder", "Hint: you can search by #tag" );
	});
});