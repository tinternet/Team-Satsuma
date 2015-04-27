/*
 * Controlls the behaviour of the login modal
 */

"use strict";
define( [
	"models/User",
	"text!template/login-modal.html",
	"modalReset"
], function( User, loginModalTemplate ) {
	
function showError( err ) {
	$loginModal
		.find( "p" )
		.text( err.message )
		.removeClass( "hidden" );
}
	
$( "body" ).append( loginModalTemplate );
	
$( "#login-form" ).on( "submit", function( e ) {
	e.preventDefault();
	e.stopPropagation();
	
	var username = $( "#username-login-input" ).val(),
		password = $( "#password-login-input" ).val();
		
	try {
		
		new User( username, password )
			.login()
			.done( function() {
				$( "#login-modal" ).modal( "hide" );
			} )
			.fail( showError );
			
	} catch ( err ) {
		
		showError( err );
	}
});
});