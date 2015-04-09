"use strict";
define(function() {
	var $forumCategories = $('.show-forum-categories'),
		$imgPanelBody = $('.show-categories img'),
		$panelBody = $('.show-categories > ul'),
		$submenu = $('.show-categories > ul > li > a'),
		$submenuCategories = $('.show-categories > ul > li > ul');
		//console.log($submenuCategories);
		$panelBody.hide();
		

$forumCategories.on("click", function(e)  {
	e.preventDefault();
	//$imgPanelBody.hide();
	$imgPanelBody.hide();
	$panelBody.show();
	
});

$submenu.on("click", function(e) {
	var $currCategory = $(e.target),
		$currUl = $currCategory.next();
		
		if($currUl.is(':visible')) {
			$currUl.hide();
		} else {
			$currUl.show()
		}
});

});