"use strict";
(function( $, requirejs ) {
	
requirejs.config({
	baseUrl: "js/"
});

Parse.initialize( "sEqxBoQA1xw3ifFF8WBFttknx1QKuHHJfiipDPTG", "GRWQnDjiBY79Tt3RKUzjLZnG5hi2fpKapnLu4tFs" );

require( [ "./authentication-system" ], function() {
	
});

}( $, requirejs ));