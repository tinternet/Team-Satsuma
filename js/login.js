"use strict";
define( [
	"./models/User",
	"./modalReset",
], function( User ) {
	
var $loginModal = $( "#login-modal" );

function showError( err ) {
	$loginModal
		.find( "p" )
		.text( err.message )
		.removeClass( "hidden" );
}
	
$( "#login-form" ).on( "submit", function( e ) {
	e.preventDefault();
	
	var username = $( "#username-login-input" ).val(),
		password = $( "#password-login-input" ).val(),
		user;
		
	try {
		user = new User( username, password );
	} catch ( err ) {
		showError( err );
		return;
	}
	
	user.login(function( err ) {
		if ( err ) {
			showError( err );
		} else {
			$loginModal.modal( "hide" );
			$( "#navbar-user-panel" ).trigger( "update" );
		}
	});
});
});