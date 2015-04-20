"use strict";
define( [
	"./models/User",
	"./modalReset"
], function( User ) {
	
var REQUIRED_FIELDS_COUNT = 5;

function showError( err ) {
	$( "#register-modal" )
		.find( "p" )
		.text( err.message )
		.removeClass( "hidden" );
}

function validateFields( e ) {
	var $input = $( e.target ),
		inputValue = $input.val().trim();
			
	if ( !inputValue ) {
		$input
			.attr( "placeholder", "Field is required!" )
			.parent()
			.addClass( "has-error" );
	} else {
		if ( $input.is( "#verify-password-input" ) && inputValue !== $( "#password-input" ).val() ) {
			$input
				.val( "" )
				.attr( "placeholder", "Passwords doesn't match!" )
				.parent()
				.addClass( "has-error" );
		} else {
			$input
				.parent()
				.removeClass( "has-error" )
				.addClass( "has-success" );
		}
	}
}

function registerUser( e ) {
	e.preventDefault();
		
	var formFieldsKeyValues = $( "#register-form" ).serializeArray(),
		i = 0, len = formFieldsKeyValues.length,
		rawUser = {}, validFieldsCount = 0;
		
	for( ; i < len; i++ ) {
		var fieldData = formFieldsKeyValues[ i ];
		rawUser[ fieldData.name ] = fieldData.value.trim();
		
		if ( rawUser[ fieldData.name ] ) {
			validFieldsCount++;
		}
	}
	
	if ( validFieldsCount !== REQUIRED_FIELDS_COUNT ) {
		// Simulate blur event to show the user that some fields has invalid values
		$( "#register-form input" ).blur();
		return;
	}
	
	delete rawUser.verifyPassword;
	
	new User( rawUser )
		.register()
		.fail( showError )
		.done( function( user ) {
			user
				.login()
				.fail( showError )
				.done( function() {
					$( "#register-modal" ).modal( "hide" );
					$( "#navbar-user-panel" ).trigger( "update" );
				} );
		} );
}

$( "#register-form" )
	.on( "blur", "input", validateFields )
	.on( "submit", registerUser );
});