"use strict";
define( [
	"./models/User",
	"./modalReset",
	"./login",
	"./register"
], function( User ) {

$( "#navbar-user-panel" )
	
	// Handle user state change
	// Show/hides user panel buttons
	.on( "update", function() {
		var user = User.getCurrent();

		if ( user ) {
			$( "#navbar-user-panel" )
				.find( ".greetings a" )
					.text( user.username )
				.end()
				.find( ".greetings" )
					.removeClass( "hidden" )
				.end()
				.find( "a" )
				.not( ".user-link" )
					.filter( "[data-role='logout']" )
						.removeClass( "hidden" )
					.end()
					.not( "[data-role='logout']" )
						.addClass( "hidden" );
		} else {
			$( "#navbar-user-panel" )
				.find( ".greetings" )
					.addClass( "hidden" )
				.end()
				.find( "a[data-role='logout']" )
					.addClass( "hidden" )
				.end()
				.find( "a" )
					.not( "[data-role='logout']" )
						.removeClass( "hidden" );
		}
	})
	
	// Prevent the default behaviour on the links inside the user panel
	// We open modals when clicked
	.on( "click", "a", function( e ) {
		e.preventDefault();
	
		var buttonRole = $( e.target ).data( "role" );

		switch( buttonRole ) {
			case "login":
				$( "#login-modal" ).modal( "show" );
				break;
			case "register":
				$( "#register-modal" ).modal( "show" );
				break;
			case "logout":
				User.logout();
				$( "#navbar-user-panel" ).trigger( "update" );
				break;
			default:
				// It is just a link
				window.location = $( e.target ).attr( "href" );
				break;
		}
	})
	
	// Set initial state
	.trigger( "update" );
});