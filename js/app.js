"use strict";
(function( $, requirejs ) {
requirejs.config({
	baseUrl: "js/"
});

Parse.initialize("sEqxBoQA1xw3ifFF8WBFttknx1QKuHHJfiipDPTG", "GRWQnDjiBY79Tt3RKUzjLZnG5hi2fpKapnLu4tFs");

var TestObject = Parse.Object.extend("TestObject"),
		testObject = new TestObject();
		
testObject
	.save( { foo: "bar" } )
	.then(function( object ) {
		alert( "Test object saved to parse.com" );
	});

require( [ 'sampleModule' ], function( sampleModule ) {
	sampleModule.show( "...AND BOOTSTRAP!" );
});
}( $, requirejs ));