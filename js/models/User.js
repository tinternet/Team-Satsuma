/*
 * User model
 * 
 * Prototype methods:
 * 	register() - Attempts to register user with the current instance properties. Returns promise.
 * 	login() - Attempts to login with the instance username & password properties. Returns promise.
 * 	toPointer() - Returns the current instance as Parse.com pointer type.
 * 	logout() - Logouts the current logged in user.
 * 
 * Static methods:
 * 	getCurrent() - Returns the current logged in user or null if not logged in.
 * 	logout() - Same as the prototype method.
 */

"use strict";
define( [
	"parseDotComHeader",
	"models/Exceptions",
	"models/ParseObject",
	"helpers/extends"
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
	
	delete this._existsOnServer;
	
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
		$( document ).trigger( "userLoggedIn" );
	});
}

function register() {
	return $.ajax({
		method: "POST",
		url: SIGNUP_URL,
		data: JSON.stringify( this ),
		headers: parseHeader,
		context: this
	})
	.done(function( user ) {
		User.call( this, user );
		delete this.password;
		localStorage.user = JSON.stringify( this );
		$( document ).trigger( "userLoggedIn" );
	});
}

function toPointer() {
	if ( !this.objectId ) {
		throw Error( "The user doesn`t exiests on the server! Cannot convert to pointer!" );
	}
	
	return {
		"__type": "Pointer",
		"className": "_User",
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
		var user = JSON.parse( localStorage.user );
		return new User( user );
	}
};

User.logout = User.prototype.logout = function() {
	
	// TODO: Check if user exists!
	
	var user = User.getCurrent(),
	   headers = Object.create( parseHeader );
	   
	headers[ "X-Parse-Session-Token" ] = user.sessionToken;
	
	$.ajax({
		url: LOGOUT_URL,
		method: "POST",
		headers: headers,
		context: this
	})
	.done(function() {
		delete localStorage.user;
		$( document ).trigger( "userLoggedOut" );
	});
};

return User;
});