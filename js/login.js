"use strict";
define( [
	"./models/User",
	"./modalReset",
], function( User ) {
	
function showError( err ) {
	$loginModal
		.find( "p" )
		.text( err.message )
		.removeClass( "hidden" );
}

function onLoggedIn() {
	$( "#login-modal" ).modal( "hide" );
	$( "#navbar-user-panel" ).trigger( "update" );
}
	
$( "#login-form" ).on( "submit", function( e ) {
	e.preventDefault();
	
	var username = $( "#username-login-input" ).val(),
		password = $( "#password-login-input" ).val();
		
	try {
		
		new User( username, password )
			.login()
			.done( onLoggedIn )
			.fail( showError );
			
	} catch ( err ) {
		
		showError( err );
	}
});
});