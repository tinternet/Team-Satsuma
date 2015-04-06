"use strict";
define(function() {
var message = "Hello jQuery, RequireJS";

function alertMsg( msg ) {
	alert( message + msg );
}

// Public stuff
return {
	// Useless function cannot be documented
	show: alertMsg
}
});