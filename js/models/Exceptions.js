"use strict";
define({

    //put custom exceptions here
    emptyFieldException: function( args ) {
        return TypeError( "The input field is empty." );
    },

    passwordsDontMatchException: function( args ) {
        return TypeError( "The passwords are not identical." );
    },

    usernameAndPasswordRequiredException: function( args ) {
        return TypeError("Username and password are required!");
    },

    usernameAlreadyTakenException: function( args ) {
        return TypeError("Username has already been taken!");
    },

    invalidUsernameOrPasswordException: function( args ) {
        return TypeError("Invalid username or password!");
    }

});