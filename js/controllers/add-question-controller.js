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

    function generateAddQuestionHtml() {
        var categoryMenu =
            "<div class='add-question-container'>Select a category" +
            "<select id='add-question-forum-categories'>" +
            "<option value='JavaScript'>JavaScript</option>" +
            "<option value='Java'>Java</option>" +
            "<option value='PHP'>PHP</option>" +
            "<option value='C#'>C#</option>" +
            "</select></div>";

        $questionFields
            .append( categoryMenu )
            .append(
                $("<div class='add-question-container'>")
                    .append( $( "<label for='question-id-input'>" ).text( "Question title" ) )
                    .append( "<input class='form-control' type='text' name='questionId' id='question-id-input'>" )
            )
            .append(
                $("<div class='add-question-container'>")
                    .append( $( "<label for='question-content-input'>" ).text( "Question title" ) )
                    .append( "<textarea class='form-control' name='questionContent' id='question-content-input'>" )
            )
            .append( "<input type='button' id='question-add-button' value='Submit Question'>" );
    }


    $( "#question-submit").click( function( ev ) {
        var
            title = $( "#question-title").val(),
            content = $( "#question-content").val(),
            category = $( "#add-question-forum-categories option:selected").val(),
            question;

        if ( title.isEmpty() || content.isEmpty() ) {
            throw Exception.emptyFieldException( "The question title or content is empty!" );
        } else {
            question = new Question( category, title, content, user );
            question.save( user ); //not sure if user is the correct thing to pu inside save()
        }

        //TODO - loads the category list in the forum after question is saved
    })
} );