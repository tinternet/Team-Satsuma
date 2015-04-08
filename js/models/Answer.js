"use strict";
define( [ "parseDotComHeader" ], function( parseHeader ) {

	function Answer(text, user) {
		this.text = text;
		this.user = user;
		this.date = new Date();
	}

	return Answer;
}