"use strict";
define( [ "parseDotComHeader", "models/Exceptions" ], function( parseHeader, Exceptions ) {

var
	SIGNUP_URL = "https://api.parse.com/1/users",
	LOGIN_URL = "https://api.parse.com/1/login";

function User( username, password ) {
	if ( !username || !password ) {
		throw Exceptions.usernameAndPasswordRequiredException();
	}

	this.username = username;
	this.password = password;
}

function login( callback ) {
	$.ajax({
		method: "GET",
		url: LOGIN_URL,
		data: { username: this.username, password: this.password },
		headers: parseHeader,
		crossDomain: true,
		context: this
	})
	.done(function( user ) {
		localStorage.user = JSON.stringify( user );
		
		// Clear important data
		delete this.password;
		
		for ( var prop in user ) {
			this[ prop ] = user[ prop ];
		}
		
		callback();
	})
	.fail(function() {
		callback( Exceptions.invalidUsernameOrPasswordException() );
	});
}

function register( callback ) {
	$.ajax({
		method: "POST",
		url: SIGNUP_URL,
		data: JSON.stringify( this ),
		headers: parseHeader,
		crossDomain: true,
		contentType: "application/json",
		context: this
	})
	.done(function() {
		this.login( callback );
	})
	.fail(function() {
		callback( Exceptions.usernameAlreadyTakenException() );
	});
}

User.prototype = {
	login: login,
	register: register,
	constructor: User
};

User.getCurrent = function() {
	if ( !localStorage.user ) {
		return null;
	} else {
		return JSON.parse( localStorage.user );
	}
};

User.logout = function() {
	delete localStorage.user;
};

return User;
});