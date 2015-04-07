"use strict";
define(function() {
	var $forumCategories = $('.show-forum-categories'),
		$imgPanelBody = $('.show-categories img'),
		$panelBody = $('.show-categories ul');
		$panelBody.hide();
		

$forumCategories.on("click", function(e)  {
	e.preventDefault();
	//$imgPanelBody.hide();
	$imgPanelBody.hide();
	$panelBody.show();
	
});
});