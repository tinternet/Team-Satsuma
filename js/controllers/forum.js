"use strict";

define([
	"models/Question"
], function( Question ) {
	
function showView( view, data ) {
	var viewPath = "text!template/" + view;
	
	require( [ viewPath ], function( view ) {
		var template = Handlebars.compile( view );
		var html = template( data );
		
		$( "#page-container" )
			.empty()
			.append( html );
	});
}

function showCategory( category ) {
	var params = {
		where: {
			category: category
		}
	};
	
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
			showView( "topic.html", question.question );
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