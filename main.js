//Load JSON file with questions
var questions = require('./basicquestions.json');

//requiring our Basic Card module exported from BasicCard.js
var BasicCard = require("./BasicCard.js");

// Load the NPM Package inquirer
var inquirer = require("inquirer");

// Core node package for reading and writing files
var fs = require("fs");
// variable we will use to count how many times our questions have been asked
var count = 0;
var noOfCorrect = 0;
var noOfWrong =0;


//Strart the Game
startGame();

function askQuestions(){
	
	if( count < questions.length){
		// Create a "Prompt" with a series of questions.
		inquirer.prompt([
			// Here we create a basic text prompt.
			{
			    type: "input",
			    message: questions[count]['front'],
			    name: "userReply"
			}
		]).then(function(response) {
				//check whether user reply is the correct answer
			    if(response.userReply.trim().toLowerCase()=== questions[count]['back'])
			    {
			    	console.log("Your answer is correct!.\n");
			    	noOfCorrect++;
			    }
			    else{
			    	console.log("Your answer is worng!.\n");
			    	console.log("Correct Answer is ==> "+questions[count]['back']+"\n");
			    	noOfWrong++;
			    }
			// add one to count to increment our recursive loop by one
			count++;
			// run the askquestion function again so as to either end the loop or ask the questions again
			askQuestions();

			});

	}
	else {
	  console.log("*********** All Questions Asked **********\n ");
	  console.log("Total No. Of Correct Answers: "+noOfCorrect+"\n");
	  console.log("Total No. Of Wrong Answers: "+noOfWrong+"\n");

	}
 
}


function addFlashCard(){
	 console.log("\n----------- New Flash Card! --------------\n");
	// Created a series of questions
	inquirer.prompt([


		{
	    	type: "input",
	    	name: "question",
	    	message: "Please enter your question\n"
		},
		{
	    	type: "input",
	    	name: "answer",
	    	message: "Please enter related answer\n"
	  	}
	]).then(function(newQues) {

		//call basic card function constructor
		var newCard = new BasicCard(newQues.question,newQues.answer.trim().toLowerCase());
		
		console.log(newCard);
		console.log("");
		saveFlashCard(newCard);

	});
}
  
//Following function will update the JSON file with new flash card.
function saveFlashCard(newCard){

	//Read the Questions from JSON File
	fs.readFile('basicquestions.json', function (err, data) {
	      //console.log(data);
	    if(err){
	    	console.log(err);
	    }

	    //convert questions string to an object
	    var questionObject = JSON.parse(data);
	    
	    //add new question to main object
	    questionObject.push(newCard);


	    fs.writeFile("basicquestions.json",JSON.stringify(questionObject), function(err) {

	      // If the code experiences any errors it will log the error to the console.
	      if (err) {
	        return console.log(err);
	      }

	      // Otherwise, it will print: "movies.txt was updated!"
	      console.log("New Question was added to the file.\n");
	      process.exit();
	    });
	});
}

function startGame(){
	inquirer.prompt([
	    // Here we create a basic text prompt.
	    {
	      type: "input",
	      name: "type",
	      message: "Please Enter What you like to do bellow !\n"+
	      "Create - To create a new flash card\n"+
	      "Play - To play the game\n"
	    }
	]).then(function(resp) {

		//console.log(resp.type);

		var userPref = resp.type.trim().toLowerCase();

		if(userPref === "create" || userPref === "play"){
			
			if(userPref === "create") {
				addFlashCard();
			}
			else{
				askQuestions();
			}
		}
		else{
			console.log('Invalid Option selected.');
		}

	});
}


