// The idea is to generate a new html field with fields to add a neq question
// and to append it in the index.html

"use strict";
define( [
    "models/ParseObject",
    "models/User",
    "models/Question",
    "models/Exceptions",
    "extends"
], function( ParseObject, User, Question, Exception ) {
    //TODO - needs data validation
        var
            user = User.getCurrent(),
            $panel = $( ".panel-primary" ),
            $panelHeader = $( "<header class='panel-heading'>" )
                .append(
                    $( "<h3>" )
                    .text( "Add a new question" )
                ),
            $panelBody = $( "<div class='panel-body'>"),
            $questionFields = $( "<div>" );

    //TODO - Just for testing purpose at the moment - needs to be written properly with more fields, etc...
        $questionFields
            .append( "<input type='text' id='question-title'>" )
            .append( "<textarea id='question-content'>" )
            .append( "<button id='question-submit'>" );

        $questionFields.appendTo( $panelBody );
        $panelHeader.appendTo( $panel );
        $panelBody.appendTo( $panel );

    $( "#question-submit").click( function( ev ) {
        var
            title = $( "#question-title").val(),
            content = $( "#question-content").val(),
            author = user.objectId,
            question;

        question = new Question( title, content, author );
        question.save( user ); //not sure if user is the correct thing to pu inside save()
    })
} );