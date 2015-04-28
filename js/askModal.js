/*
 * Controlls the behaviour of the ask modal
 */

"use strict";
define( [
	"models/User",
	"text!template/ask-modal.html",
	"models/Question",
	"modalReset"
], function( User, askModalTemplate, Question ) {
	
$( "body" ).append( askModalTemplate );

function validateFields( e ) {
	var $input = $( e.target ),
		inputValue = $input.val().trim(),
		hasError = false;
			
	if ( !inputValue ) {
		$input
			.attr( "placeholder", "Field is required!" )
			.parent()
			.addClass( "has-error" );
	} else {
		hasError = $input.is( "[name='title']" ) && inputValue.length > Question.MAX_TITLE_LENGTH;
		hasError = $input.is( "[name='content']" ) && inputValue.length > Question.MAX_CONTENT_LENGTH;
		
		if ( hasError ) {
			$input
				.attr( "placeholder", "Maximum length is " + Question.MAX_TITLE_LENGTH )
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

$( "#ask-form" )
	.on( "submit", function( e ) {
		e.preventDefault();
		e.stopPropagation();
		
		var formData = $( this ).serializeArray(),
			question = new Question(),
			hasError = false;
			
		formData.forEach(function( data ) {
			question[ data.name ] = data.value;
			
			if ( data.name === "tags" ) {
				var tags = data.value.split( "," );
				
				for ( var i = 0, len = tags.length; i < len; i++ ) {
					if ( tags[ i ].trim().length > Question.MAX_TAG_LENGTH ) {
						$( "#ask-form input[name='tags']" )
							.text( "Maximum tag length is " + Question.MAX_TAG_LENGTH )
							.parent()
							.addClass( "has-success" );
						hasError = true;
						break;
					}
				}
				
				question[ data.name ] = tags;
			}
		});
		
		if ( hasError ) {
			return;
		}
		
		try {
			question.save().done(function() {
				window.location.hash = "/forum/view/" + question.objectId
				$( "#ask-modal" ).modal( "hide" );
			});
		} catch ( er ) {
			$( "#ask-form input, #ask-form textarea" ).trigger( "blur" );
		}
		
	})
	.on( "blur", "input, textarea", validateFields );
});
