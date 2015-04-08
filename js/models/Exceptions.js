"use strict";
define([], function() {
    var exceptions = exceptions || {};

    (function Exceptions(excep) {
        //add custom exceptions here
        var emptyFieldException = new TypeError('The input field is empty.'),
            passwordsDontMatchException = new TypeError('The passwords are not identical.');


        excep.emptyFieldException = function() {
            return emptyFieldException;
        };

        excep.passwordsDontMatchException = function() {
            return passwordsDontMatchException;
        };
    }(exceptions));

    return exceptions;
});