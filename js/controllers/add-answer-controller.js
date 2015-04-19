// The idea is to generate a new html element with fields to add a new answer
// and to append it in the index.html

"use strict";
define( [
	"models/ParseObject",
    "models/User",
    "models/Question",
    "models/Answer"
    "models/Exceptions",
    "extends"
], function( ParseObject, User, Question, Answer, Exception ) {
		var 
			user = User.getCurrent(),
			$panel = $( ".panel-primary" ),
            $panelHeader = $( "<header class='panel-heading'>" )
                .append(
                    $( "<h3>" )
                    .text( "Add a reply" )
                ),
            $panelBody = $( "<div class='panel-body'>"),
            $answerFields = $( "<div>" );
        
        //TODO - when a question is opened and you click on "Reply" button, a controller should get the question and pass it here    
        function generateAddAnswerHtml( question ) {
        	var question = question;
        	$answerFields
        		.append(
        			$("<div class='add-answer-container'>")
                    .append( "<label for='answer-content-input'>" )
                    .append( "<textarea class='form-control' name='answerContent' id='answer-content-input'>" )
        		)
        		.append( "<input type='button' id='answer-add-button' value='Submit Answer'>" );
        		
        	$answerFields.appendTo( $panelBody );
        	$panel
        		.append( $panelHeader )
        		.append( $panelBody );
        }
        
        $( "#answer-add-button" ).click( function( ev ) {
        	var content = $( "#answer-content-input" ).val(),
        		answer;
        	
        	if ( content.isEmpty() ) {
        		throw Exception.emptyFieldException( "The answer content is empty!" );
        	} else {
        		answer = new Answer( content, user, question );
        		answer.save();
        	}
        	
        	//TODO - loads the question with all replies when the answer is saved
        } )
} )
