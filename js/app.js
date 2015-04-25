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
	"./userPanel",
	"./search"
	
	/* Add more *CORE* dependencies to this array...
		There is no need to include modules for later use!
		Note: We require a module *just* before we need it! */
], function() {
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
				$( "#page-container" )
					.empty()
					.load( "templates/index.html" );
			})
			.get( "#/forum/category/:category", function() {
				var category = this.params.category;
				
				require( [ "controller/forum" ], function( forumController ) {
					forumController.showCategory( category );
				});
			})
			.get( "#/forum/view/:id", function() {
				var id = this.params.id;
				
				require( [ "controller/forum" ], function( forumController ) {
					forumController.show( id );
				});
			});
	}).run( "#/" );
});

}( $, requirejs, Sammy ));

