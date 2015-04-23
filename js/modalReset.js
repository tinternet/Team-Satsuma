/*
 * Clears the login/register modals on closed/closing
 */
"use strict";
define(function() {

$( document )

	// Fired when modal is closing
	.on( "hide.bs.modal", function( e ) {
		$( e.target )
			.removeClass( "rollIn" )
			.addClass( "rollOut" )
			.find( "p" )
				.text( "" )
				.addClass( "hidden" )
			.end()
			.find( ".form-control" )
				.val( "" );
	})
	
	// Fired when modal is closed
	.on( "hidden.bs.modal", function( e ) {
		$( e.target )
			.removeClass( "rollOut" )
			.addClass( "rollIn" )
			.find( ".login-input-container" )
				.removeClass( "has-error" )
				.removeClass( "has-success" )
			.end()
			.find( ".register-input-container" )
				.removeClass( "has-error" )
				.removeClass( "has-success" );
				
	});
});