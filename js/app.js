"use strict";
(function( $, requirejs, Sammy ) {
	
// Require js configuration
requirejs.config({
	baseUrl: "js/",
	paths: {
		"model": "models",
		"controller": "controllers",
		"template": "../templates"
	}
});

require( [
	"controller/home",
	"controller/forum",
	"./navbar",
	"./search",
], function( homeController, forumController ) {
	var $progress = $( "#main-progress" );
	
	$( document )
		.ajaxStop(function() {
			$progress.hide();
		})
		.ajaxStart(function() {
			$progress.show();
		});
	
	Sammy(function() {
		
		this
			.get( "#/", function() {
				homeController.index();
			})
			.get ( "#/forum", function() {
				forumController.showCategory();
			})
			.get( "#/forum/category/:category", function() {
				forumController.showCategory( this.params.category );
			})
			.get( "#/forum/view/:id", function() {
				forumController.show( this.params.id );
			})
			.before(function() {
				$( document ).off( ".forum .home" );
			});
	}).run( "#/" );
});

}( $, requirejs, Sammy ));

