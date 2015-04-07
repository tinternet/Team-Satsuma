"use strict";
define(function() {

$.fn.autoHide = $.fn.autoHide || function( timeout ) {
	timeout = timeout || 1000; // Defaut 1 seconds
	
	setTimeout($.proxy(function() {
		this.hide();
	}, this ), timeout );
	
	return this;
}
})