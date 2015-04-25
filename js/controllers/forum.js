"use strict";

define([
	"models/Question"
], function( Question ) {
	
function showView( view, data, callback ) {
	var viewPath = "text!template/" + view;
	
	require( [ viewPath ], function( view ) {
		var template = Handlebars.compile( view );
		var html = template( data );
		
		$( "#page-container" )
			.empty()
			.html( html );
			
		if ( callback ) {
			callback();
		}
	});
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
	Question.getById( id )
		.done(function( question ) {
			showView( "topic.html", question.question, function() {
				require( [ "helpers/post-comment" ], function( postComment ) {
					$( "#post-comment-form" ).on( "submit", function( e ) {
						e.preventDefault();
						e.stopPropagation();

						var formData = $( this ).serializeArray();

						console.log(question.question);

						postComment( formData, question.question, showAnswer );
					});
				});
			});
		})
		.fail(function( err ) {
			console.error( err );
		});
}

return {
	showCategory: showCategory,
	show: show
};
});