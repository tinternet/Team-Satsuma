"use strict";
(function( $, requirejs ) {
	
// Require js configuration
requirejs.config({
	baseUrl: "js/",
	paths: {
		"model": "models",
		"controller": "controllers"
	}
});

require( [
	"./userPanel",
	"./search",
	"models/Question",
	"models/Answer",
	"controller/show-forum-categories"
	
	/* Add more *CORE* dependencies to this array...
		There is no need to include modules for later use!
		Note: We require a module *just* before we need it! */
], function() {
	// Main method
	
});

}( $, requirejs ));

