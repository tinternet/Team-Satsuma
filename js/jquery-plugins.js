"use strict";
define(function() {
	$.fn.autoHide = $.fn.autoHide || function( timeout ) {
		timeout = timeout || 1000; // Defaut 1s
		
		setTimeout($.proxy(function() {
			if ( this.is( ".modal" ) ) {
				this.modal( "hide" );
			} else {
				this.hide();
			}
		}, this ), timeout );
	}
})