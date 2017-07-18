//Load JSON file with questions
var questions = require('./basicquestions.json');

// Load the NPM Package inquirer
var inquirer = require("inquirer");


// variable we will use to count how many times our questions have been asked
var count = 0;
var noOfCorrect = 0;
var noOfWrong =0;

function askQuestions(){
	
	if( count < questions.length){
		// Create a "Prompt" with a series of questions.
		inquirer.prompt([
			// Here we create a basic text prompt.
			{
			    type: "input",
			    message: questions[count]['question'],
			    name: "userReply"
			}
		]).then(function(response) {
				//check whether user reply is the correct answer
			    if(response.userReply.trim()=== questions[count]['answer'])
			    {
			    	console.log("Your answer is correct!.\n");
			    	noOfCorrect++;
			    }
			    else{
			    	console.log("Your answer is worng!.\n");
			    	console.log("Correct Answer is ==> "+questions[count]['answer']+"\n");
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

//Strart the Game
askQuestions();



// var quesStr = {question:"What is the capital of California?",
//   answer:"Sacramento"};

//   fs.readFile('basicquestions.json', function (err, data) {
//         //console.log(data);
//       if(err){
//       	console.log(err);
//       }

//       var json = JSON.parse(data);
//       	console.log(json);

//       json.push(quesStr);

//       //fs.writeFile("basicquestions.json", JSON.stringify(json),function(err)

//       fs.writeFile("basicquestions.json",quesStr, function(err) {

//         // If the code experiences any errors it will log the error to the console.
//         if (err) {
//           return console.log(err);
//         }

//         // Otherwise, it will print: "movies.txt was updated!"
//         console.log("JSON file was updated!");

//       });
//   });


// fs.appendFile('./basicquestions.json', quesStr, function(err) {

//   // If an error was experienced we say it.
//   if (err) {
//     console.log(err);
//   }

//   // If no error is experienced, we'll log the phrase "Content Added" to our node console.
//   else {
//     console.log("Content Added!");
//   }

// });
