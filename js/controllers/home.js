"use strict";
define([
	"models/Question",
	"text!template/index.html"
], function( Question, indexTemplate ) {

var RECENT_TOPICS_COUNT = 5;
	
function index() {
	var template = Handlebars.compile( indexTemplate );
	var filter = {
		order: "-dateCreated",
		limit: RECENT_TOPICS_COUNT
	};
	
	Question.loadAll( filter )
		.done(function( response ) {
			var html = template( response.results );
			
			$( "#page-container" )
				.empty()
				.html( html );
		})
		.fail(function( err ) {
			console.error( err );
		});
}

return {
	index: index
};
});