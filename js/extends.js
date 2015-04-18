"use strict";
define(function() {

Function.prototype.extends = function( parent ) {
	this.prototype = Object.create( parent.prototype );
	this.prototype.constructor = this;
	
	var child = this;
	
	// Inherit static fields
	Object.keys( parent ).forEach(function( key ) {
		if ( parent.hasOwnProperty( key ) ) {
			child[ key ] = parent[ key ];
		}
	});
}

});