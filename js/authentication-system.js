"use strict";
define(function() {

var
	$authContainer = $( "#authentication-container" ),
	$authModal = $( "#authModal" ),
	$loginForm = $( "#login-form" ),
	$signupForm = $( "#signup-form" );
	
function updateAuthContainer() {
	var user = Parse.User.current();
	
	if ( user ) {
		$authContainer
			.find( ".greetings a" )
				.text( user.attributes.username )
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

function login( userName, password ) {
	Parse.User.logIn( userName, password,
	{
		success: function( user ) {
			$authModal.modal( "hide" );
			updateAuthContainer();
		},
		error: function( user, error ) {
			$loginForm
				.find( "p" )
				.text( error.message )
				.removeClass( "hidden" );
		}
	});
}

function register( userName, password ) {
	new Parse.User().signUp(
		{
			"username": userName,
			"password": password
		},
		{
			success: function( user ) {
				$authModal.modal( "hide" );
				updateAuthContainer();
			},
			error: function( user, error ) {
				$signupForm
					.find( "p" )
					.text( error.message )
					.removeClass( "hidden" );
			}
		}
	);
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
			Parse.User.logOut();
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
	
	var userName = $( "#username-input" ).val(),
		password = $( "#password-input" ).val();
		
	register( userName, password );
});

$loginForm.on( "submit", function( e ) {
	e.preventDefault();
	
	var userName = $( "#username-login-input" ).val(),
		password = $( "#password-login-input" ).val();
		
	login( userName, password );
});
	
// Set initial state
updateAuthContainer();
});