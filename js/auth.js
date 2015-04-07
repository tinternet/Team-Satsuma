"use strict";
define( [
	"models/User",
	"parseHeader"
], function( User, parseHeader ) {
	
var SIGNUP_URL = "https://api.parse.com/1/users",
	LOGIN_URL = "https://api.parse.com/1/login";

function register( username, password, callback ) {
	var user = new User( username, password );
	
	$.ajax({
		method: "POST",
		url: SIGNUP_URL,
		data: JSON.stringify( user ),
		headers: parseHeader,
		crossDomain: true,
		contentType: "application/json"
	})
	.done(function( msg ) {
		console.log( msg );
	});
}

function login( username, password, callback ) {
	var user = new User( username, password );
	
	$.ajax({
		method: "GET",
		url: LOGIN_URL,
		data: user,
		headers: parseHeader,
		crossDomain: true
	})
	.done(function( msg ) {
		console.log( msg );
	});
}

function logout() {
	
}

return {
	register: register,
	login: login,
	logout: logout
}
});