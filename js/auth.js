"use strict";
define( [
	"models/User",
	"parseHeader"
], function( User, parseHeader ) {
	
var
	SIGNUP_URL = "https://api.parse.com/1/users",
	LOGIN_URL = "https://api.parse.com/1/login";

function register( user ) {
	var deferred = $.Deferred();
	
	$.ajax({
		method: "POST",
		url: SIGNUP_URL,
		data: JSON.stringify( user ),
		headers: parseHeader,
		crossDomain: true,
		contentType: "application/json"
	})
	.done(function() {
		// Do login to get user information
		login( user.username, user.password )
			.done(function( user ) {
				deferred.resolve( user );
			})
			.fail(function( err ) {
				// Registration successful, but login was not....
				// This should not happen!
				
				console.error( err );
				deferred.reject( err );
			});
	})
	.fail(function() {
		deferred.reject( Error( "Username already taken!" ) );
	});
	
	return deferred.promise();
}

function login( username, password ) {
	var deferred = $.Deferred();
	
	$.ajax({
		method: "GET",
		url: LOGIN_URL,
		data: { username: username, password: password },
		headers: parseHeader,
		crossDomain: true
	})
	.done(function( user ) {
		localStorage.user = JSON.stringify( user );
		deferred.resolve( user );
	})
	.fail(function() {
		deferred.reject( Error( "Invalid username/password!" ) );
	});
	
	return deferred.promise();
}

return {
	register: register,
	login: login,
	logout: function() {
		delete localStorage.user;
	},
	get currentUser() {
		if ( !localStorage.user ) {
			return null;
		} else {
			return JSON.parse( localStorage.user );
		}
	}
}
});