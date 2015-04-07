"use strict";
(function( $, requirejs ) {
	
// Require js configuration
requirejs.config({
	baseUrl: "js/"
});

// Parse.com api initializer
Parse.initialize( "sEqxBoQA1xw3ifFF8WBFttknx1QKuHHJfiipDPTG", "GRWQnDjiBY79Tt3RKUzjLZnG5hi2fpKapnLu4tFs" );

require( [
	"./authentication-system"
	
	/* Add more *CORE* dependencies to this array...
		There is no need to include modules for later use!
		Note: We require a module *just* before we need it! */
], function() {
	// Main method
	
});

}( $, requirejs ));

