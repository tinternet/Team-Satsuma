"use strict";
define( [
	"./models/User",
	"./modalReset",
], function( User ) {
	
var
	REQUIRED_FIELDS_COUNT = 5,
	$registerModal = $( "#register-modal" );

// Fired when input field is unfocused
$( "#register-form" ).on( "blur", "input", function( e ) {
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
});
	
$( "#register-form" ).on( "submit", function( e ) {
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
		$( "#register-form input" ).trigger( "blur" );
		return;
	}
	
	new User( rawUser )
		.register(function( err ) {
			if ( err ) {
				$registerModal
					.find( "p" )
					.text( err.message )
					.removeClass( "hidden" );
			} else {
				$registerModal.modal( "hide" );
				$( "#navbar-user-panel" ).trigger( "update" );
			}
		});
});
});