"use strict";
define( [ "auth" ], function( auth ) {
	
// TODO: This module needs improvements
// Loose coupling & strong cohesion!

var
	$authContainer = $( "#authentication-container" ),
	$authModal = $( "#authModal" ),
	$loginForm = $( "#login-form" ),
	$signupForm = $( "#signup-form" );
	
function updateAuthContainer() {
	var user = auth.currentUser;
	
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
			auth.logout();
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
		rawUser = {},
		data;
		
	for( ; i < len; i++ ) {
		data = formData[ i ];
		rawUser[ data.name ] = data.value;
	}
	
	if ( rawUser.password != rawUser.verifyPassword ) {
		$loginForm
				.find( "p" )
				.text( "Passwords does not match!" )
				.removeClass( "hidden" );
		return;
	}
	
	// Ignore any validations... FOR NOW!
	// Skip make instance of the user model....
	// This must be improved!
	delete rawUser.verifyPassword;
	
	auth
		.register( rawUser )
		.done(function() {
			$authModal.modal( "hide" );
			updateAuthContainer();
		})
		.fail(function( err ) {
			$loginForm
				.find( "p" )
				.text( err.message )
				.removeClass( "hidden" );
		})
	
	//auth.register( userName, password );
});

$loginForm.on( "submit", function( e ) {
	e.preventDefault();
	
	var username = $( "#username-login-input" ).val(),
		password = $( "#password-login-input" ).val();
		
	auth
		.login( username, password )
		.done(function() {
			$authModal.modal( "hide" );
			updateAuthContainer();
		})
		.fail(function( error ) {
			$loginForm
				.find( "p" )
				.text( error.message )
				.removeClass( "hidden" );
		});
});
	
// Set initial state
updateAuthContainer();
});