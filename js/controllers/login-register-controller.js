"use strict";
define( [ "models/User" ], function( User ) {
	
// TODO: This module needs improvements
// Loose coupling & strong cohesion!

var
	$authContainer = $( "#authentication-container" ),
	$authModal = $( "#authModal" ),
	$loginForm = $( "#login-form" ),
	$signupForm = $( "#signup-form" );
	
function updateAuthContainer() {
	var user = User.getCurrent();
	
	if ( user ) {
		$authContainer
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
		$authContainer
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
}

// Clear all fields on modal close
$authModal.on( "hide.bs.modal", function( e ) {
	$authModal
		.removeClass( "rollIn" )
		.addClass( "rollOut" )
		.find( "p" )
			.text( "" )
			.addClass( "hidden" )
		.end()
		.find( ".form-control" )
			.val( "" );
});
	
// Reset animations
$authModal.on( "hidden.bs.modal", function() {
	$authModal
		.removeClass( "rollOut" )
		.addClass( "rollIn" );
});
	
// Change default behaviour on navbar links
$authContainer.on( "click", "a", function( e ) {
	e.preventDefault();
	
	var buttonRole = $( e.target ).data( "role" );
	
	switch( buttonRole ) {
		case "login":
			$signupForm.hide();
			$loginForm.show();
			$authModal.modal( "show" );
			break;
		case "register":
			$signupForm.show();
			$loginForm.hide();
			$authModal.modal( "show" );
			break;
		case "logout":
			User.logout();
			updateAuthContainer();
			break;
		default:
			// It is just a link
			window.location = $( e.target ).attr( "href" );
			break;
	}
});
	
$signupForm.on( "submit", function( e ) {
	e.preventDefault();
	
	// Main validation logic
	var formData = $signupForm.serializeArray(),
		i = 0, len = formData.length,
		user = new User( "bypassCheck", "bypassCheck" ), // This needs to be improved
		data;
		
	for( ; i < len; i++ ) {
		data = formData[ i ];
		user[ data.name ] = data.value;
	}
	
	if ( user.password != user.verifyPassword ) {
		$loginForm
				.find( "p" )
				.text( "Passwords does not match!" )
				.removeClass( "hidden" );
		return;
	}
	
	// Ignore any validations... FOR NOW!
	// Skip make instance of the user model....
	// This must be improved!
	delete user.verifyPassword;
	
	user.register(function( err ) {
		if ( err ) {
			$loginForm
				.find( "p" )
				.text( err.message )
				.removeClass( "hidden" );
		} else {
			$authModal.modal( "hide" );
			updateAuthContainer();
		}
	});
});

$loginForm.on( "submit", function( e ) {
	e.preventDefault();
	
	var username = $( "#username-login-input" ).val(),
		password = $( "#password-login-input" ).val(),
		user = new User( username, password );
		
	user.login(function( err ) {
		if ( err ) {
			$loginForm
				.find( "p" )
				.text( error.message )
				.removeClass( "hidden" );
		} else {
			$authModal.modal( "hide" );
			updateAuthContainer();
		}
	});
});
	
// Set initial state
updateAuthContainer();
});