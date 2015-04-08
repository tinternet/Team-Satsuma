"use strict";
define( [ "parseDotComHeader" ], function( parseHeader ) {

	function Theme(title, user) {
		this.title = title;
		this.user = user;
		this.date = new Date();
		this.answer = [];
	}


	return Theme;
}