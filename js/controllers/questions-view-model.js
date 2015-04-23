"use strict";
define( [
	"models/Question",
	"text!template/questions-table.html",
	"extends"
], function( Question, questionsTableTemplate ) {
	var template = Handlebars.compile( questionsTableTemplate );
	
	$("#forum-categories").on("click", "li", function( event ) {
		var nameCategory = $( event.target ).text();
		var params = {
			where: {
				category: nameCategory
			}
		};
		
		$( "#header-container" ).addClass( "collapsed" );
		$(".name-category").text( nameCategory + " topics" ); 
		$( "#main-container" ).empty();
		
		Question.loadAll( params )
			.done(function( response ) {
				var html = template( response.results );
				$( "#main-container" ).append( html );
			})
			.fail(function( err ) {
				//check connection problems, restart computer
			});
		
	});
})

