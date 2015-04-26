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
	
}

function showCategory( category ) {
	var params = {};
	
	if ( category ) {
		params.where = {
			category: category
		};
	}
	
	params.order = "-createdAt";
	
	Question.loadAll( params )
		.done(function( response ) {
			showView( "forum.html", response.results );
		})
		.fail(function( err ) {
			console.error( err ); // Debug only
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