"use strict";

define([
	"models/Question",
	"models/Answer",
	"helpers/post-comment"
], function( Question, Answer, postComment ) {

function getView( view ) {
	var viewPath = "text!template/" + view;
	var deferred = $.Deferred();
	
	require( [ viewPath ], function( view ) {
		var template = Handlebars.compile( view );
		
		deferred.resolve( template );
	});
	
	return deferred.promise();
}

function showAnswer( answer ) {
	var $answerPanel = $( "<div class='text-info'>" );
	var $credentials = $( "<div class='credentials'>" )
		.text( "Posted by: " + answer.author.username + " | On: " + answer.createdAt )
		.appendTo( $answerPanel );
	var $content = $( "<p>" )
		.text( answer.content )
		.appendTo( $answerPanel );
		
	$answerPanel
		.addClass( "animated bounceIn" )
		.add( "<hr>" )
		.appendTo( "#comments-container" );
}

function showCategory( category ) {
	var params = {
		order: "-createdAt"
	};
	
	if ( category ) {
		params.where = {
			category: category
		};
	}
	
	var questionsRequest = Question.loadAll( params );
	var viewRequest = getView( "forum.html" );
	
	$.when( questionsRequest, viewRequest )
		.done(function( questionResult, view ) {
			var questions = questionResult[ 0 ].results;
			var html = view( questions );
			
			$( html )
				.find( "article:nth-child(odd)" )
					.addClass( "animated fadeInLeft" )
				.end()
				.find( "article:nth-child(even)" )
					.addClass( "animated fadeInRight" )
				.end()
				.appendTo( $( "#page-container" ).empty() );
		})
		.fail(function( err ) {
			console.error( err );
		});
}

function show( id ) {
	var filter = {
		include: "author",
		where: {
			"question": {
				"__type": "Pointer",
				"className": "Question",
				"objectId": id
			}
		}
	};
	var questionRequest = Question.getById( id );
	var answersRequest = Answer.loadAll( filter );
	var viewRequest = getView( "topic.html" );
	
	$.when( questionRequest, answersRequest, viewRequest )
		.done(function( questionResponse, answersResponse, view ) {
			var question = questionResponse[ 0 ].question;
			var answers = answersResponse[ 0 ].results;
			var data = { question: question, answers: answers };
			var html = view( data );
			
			$( "#page-container" ).empty().html( html );
			$( "#post-comment-form" ).on( "submit", function( e ) {
				e.preventDefault();
				e.stopPropagation();
				var formData = $( this ).serializeArray();

				postComment( formData, question, showAnswer );
				
				$( this ).find( "textarea" ).val( "" );
			});
		})
		.fail(function( err ) {
			console.log( err );
		});
}

return {
	showCategory: showCategory,
	show: show
};
});