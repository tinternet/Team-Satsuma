"use strict";
define([ "parseDotComHeader" ], function( parseHeader ) {
	var searchedText = $("#search-input").val();	
	var URL = "https://api.parse.com/1/classes/";

	$( "#main-navbar-collapse form[role='search']" )
	.on( "submit", function( e ) {
		e.preventDefault();
		

		$.ajax({
			method: 'get',
			headers: parseHeader,
			url: 'https://api.parse.com/1/classes/Question?where={"tags":' + searchedText + '}',
			success: function (data) {
				$('h3 .panel-title name-category').text("Results for: " + searchedText);
				$('div .panel-body table-category').append('<ul id="results-from-search">');

				for(var index in data.results){
					var linkText = data.results[index].title;
					var linkId = data.results[index].objectId;
					$('#results-from-search')
						.append($('<li>')
							.append(
								$('<a href="#">')
								.attr('id', linkId)
								.text(linkText)
								//.click(viewQuestion) -> add a in a view file
						));

				}
			},
			error: function (err) {
				console.error(err.responseText);
			}
		});
	})
	
	// Make a hint for the user
	.find( "input" )
	.on( "focus", function() {
		$( this ).attr( "placeholder", "Hint: you can search by #tag" );
	});
});