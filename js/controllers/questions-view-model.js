"use strict";
define( [
	"models/ParseObject",
	"models/User",
	"models/Question",
	"models/Exceptions",
	"extends"
], function( ParseObject, User, Question, Exception ) {
	$("#forum-categories").on("click", "a", function(event){
		var nameCategory;
		$(".header-container").hide();
		nameCategory = $(event.target).text();
		$(".name-category").text(nameCategory + " forum"); 
		$(".table-category").empty();
		
		if(nameCategory === "JavaScript"){
			Question.loadAll("where={ \"category\" : \"JavaScript\" }").done(function(response){
				addQuestionDataToDOM(response);
			});
		}
		
		if(nameCategory === "Java"){
			Question.loadAll("where={ \"category\" : \"Java\" }").done(function(response){
				addQuestionDataToDOM(response);
			});
		}
		
		if(nameCategory === "PHP"){
			Question.loadAll("where={ \"category\" : \"PHP\" }").done(function(response){
				addQuestionDataToDOM(response);
		});
		}
		
		if(nameCategory === "C#"){
			Question.loadAll("where={ \"category\" : \"C#\" }").done(function(response){
				addQuestionDataToDOM(response);
			});
		}
		
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


