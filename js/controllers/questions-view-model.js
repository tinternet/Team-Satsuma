"use strict";
define( [
	"models/Question",
	"extends"
], function( Question ) {
	$("#forum-categories").on("click", "a", function(event){
		var nameCategory,
			filter;
		$("#header-container").addClass( "collapsed" );
		nameCategory = $(event.target).text();
		$(".name-category").text(nameCategory + " forum"); 
		$(".table-category").empty();
		
		filter = {
			"category" : nameCategory
		};
		
		Question.loadAll("where=" + JSON.stringify(filter))
			.done(function(response){
				addQuestionDataToDOM(response);
			})
			.fail(function(err){
			//check connection problems, restart computer
			});
		
	})
	
	function addQuestionDataToDOM(data){
	var container, 
		questionsTable, 
		questionsBody, 
		question,
		questionContent,
		questionTitle,
		questionCreatedAt,
		questionsRow,
		questionsTitle,
		questionTitleSpan,
		questionContentSpan,
		questionThCreatedAt,
		questionViews;
		
		$(".table-category").empty();
		container = $(".table-category");
		$(".table-category > img").hide();
		questionsTable = $('<table class="table">');
		questionsBody = $("<tbody>");
		console.log(questionsTable);
	for(question in data.results){
		//var forumCategory = data.results[question].category;
		questionContent = data.results[question].content;
		questionTitle = data.results[question].title;
		questionCreatedAt = data.results[question].createdAt;
				
		questionsRow = $("<tr>");
				
		questionsTitle = $("<td>");
		questionTitleSpan = $('<a href="#" class="question-title">');
		questionTitleSpan.text(questionTitle);
		questionContentSpan = $('<span class="question-content">');
		questionContentSpan.text(questionContent);
		questionsTitle.append(questionTitleSpan);
		questionsTitle.append(questionContentSpan);
				
		questionThCreatedAt = $("<td>");
		questionThCreatedAt.text(questionCreatedAt);

		questionViews = $("<td>");
		questionViews.text("TO DO views");
				
		questionsRow.append(questionsTitle);
		questionsRow.append(questionThCreatedAt);
		questionsRow.append(questionViews);
		questionsBody.append(questionsRow);
		questionsTable.append(questionsBody);
		container.append(questionsTable);
		}
	}
})

