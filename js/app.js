"use strict";
(function( $, requirejs ) {
// Basic configuration
requirejs.config({
	baseUrl: "js/"
});

require( [ 'sampleModule' ], function( sampleModule ) {
	sampleModule.show( "...AND BOOTSTRAP!" );
});
}( $, requirejs ));