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
	"controller/auth"
	
	/* Add more *CORE* dependencies to this array...
		There is no need to include modules for later use!
		Note: We require a module *just* before we need it! */
], function() {
	// Main method
	
});

}( $, requirejs ));

