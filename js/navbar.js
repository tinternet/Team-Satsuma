/*
 * Controlls the behaviour of the user panel located in the main navbar
 * The user panel contains login/register/logout buttons and username link
 */
"use strict";
define( [
	"models/User",
	"loginModal",
	"registerModal",
	"askModal",
	"modalReset"
], function( User ) {
	
update();

var $dropdownToggle = $( "#forum-categories" ).prev( "a" );

$( "#forum-categories" ).on( "click", "li", function( e ) {
	$dropdownToggle.trigger( "click" );
});


$( document ).on( "userLoggedIn userLoggedOut", update );

$( "#logout-link" ).on( "click", function( e ) {
		e.preventDefault();
		e.stopPropagation();
		User.logout();
});
	
function update( e ) {
	var user = User.getCurrent();

	if ( user ) {
		$( "#navbar-user-panel" )
			.find( ".greetings" )
				.text( "Welcome, " + user.username )
				.removeClass( "hidden" )
			.end()
			.find( "#logout-link" )
				.removeClass( "hidden" )
			.end()
			.find( "a:not(#logout-link)" )
				.addClass( "hidden" );

		$( "#ask-link" ).show();
	} else {
		$( "#navbar-user-panel" )
			.find( ".greetings" )
				.addClass( "hidden" )
			.end()
			.find( "#logout-link" )
				.addClass( "hidden" )
			.end()
			.find( "a:not(#logout-link)" )
				.removeClass( "hidden" );
					
		$( "#ask-link" ).hide();
	}
}
});