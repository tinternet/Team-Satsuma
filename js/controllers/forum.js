"use strict";

define([
	"models/Question",
	"models/Answer",
	"models/User"
], function( Question, Answer, User ) {

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
	var postedBy = answer.visitorName || answer.author.username;
	
	var $answerPanel = $( "<div class='text-info'>" );
	var $credentials = $( "<div class='credentials'>" )
		.text( "Posted by: " + postedBy + " | On: " + answer.createdAt )
		.appendTo( $answerPanel );
	var $content = $( "<p>" )
		.text( answer.content )
		.appendTo( $answerPanel );
		
	$answerPanel
		.addClass( "animated bounceIn" )
		.add( "<hr>" )
		.appendTo( "#comments-container" );
}

function processForm() {
	if ( !User.getCurrent() ) {
		$( "#visitor-name-input" ).show();
	} else {
		$( "#visitor-name-input" ).hide();
	}
}

function showCategory( category ) {
	var params = {
		order: "-createdAt",
		include: "author"
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
		order: "createdAt",
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
			
			$( "#page-container" )
				.empty()
				.html( html );
				
			processForm();
				
			$( "#post-comment-form" ).on( "submit", function( e ) {
				e.preventDefault();
				e.stopPropagation();
				var formData = $( this ).serializeArray();
				var answer = new Answer();
				
				formData.forEach(function( data ) {
					answer[ data.name ] = data.value;
				});
				
				answer.question = question;

				answer
					.save()
					.done(function() {
						showAnswer( answer );
						$( "#post-comment-form textarea" ).val( "" );
					});
			});
			
			$( document ).on( "userLoggedIn.forum userLoggedOut.forum", processForm );
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