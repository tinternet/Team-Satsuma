"use strict";
define( [
	"parseDotComHeader",
	"models/Exceptions",
	"models/ParseObject",
	"extends"
], function( parseHeader, Exceptions, ParseObject ) {

var
	SIGNUP_URL = "https://api.parse.com/1/users",
	LOGIN_URL = "https://api.parse.com/1/login",
	LOGOUT_URL = "https://api.parse.com/1/logout";

	
// Examples for user constructor
// new User( { username: "username", password: "password" } )
// new User( "username", "password" );
function User( username, password ) {
	ParseObject.call( this, arguments[ 0 ] );
	
	// We don`t handle server response here
	if ( typeof arguments[ 0 ] === "object" ) {
		return this;
	}
	
	if ( !arguments.length || username.isEmpty() || password.isEmpty() ) {
		throw Exceptions.usernameAndPasswordRequiredException();
	}
	
	this.username = username;
	this.password = password;
}

function login() {
	return $.ajax({
		method: "GET",
		url: LOGIN_URL,
		data: { username: this.username, password: this.password },
		headers: parseHeader,
		context: this
	})
	.done(function( user ) {
		User.call( this, user );
		delete this.password;
		localStorage.user = JSON.stringify( this );
	});
}

function register( callback ) {
	return $.ajax({
		method: "POST",
		url: SIGNUP_URL,
		data: JSON.stringify( { username: this.username, password: this.password } ),
		headers: parseHeader,
		contentType: "application/json",
		context: this
	});
}

function toPointer() {
	if ( !this.objectId ) {
		throw Error( "The user doesn`t exiests on the server! Cannot convert to pointer!" );
	}
	
	return {
		"__type": "Pointer",
		"className": "User",
		"objectId": this.objectId
	};
}

User.prototype = {
	login: login,
	register: register,
	toPointer: toPointer,
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
	
	// TODO: Make ajax request to LOGOUT_URL to delete the server session
};

return User;
});