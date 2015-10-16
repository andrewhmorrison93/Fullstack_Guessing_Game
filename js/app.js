//Guessing Game Main Functionality
	//generate a random number when the page loads
	var random = Math.floor(Math.random()*100+1);
	//declare a bunch of important variables
	var userInput;
	var userGuesses = [];
	var guessCount = 5;
	var difference = 0;

//a function that changes the #message to whatever "message" is, then sets the input field to the given "placeholder" sring
var changeMessage = function(message, placeholder) {
	$("#message").html("<h3>" + message + "</h3>").css("text-align", "center");
	$("input").val(placeholder);
};

//a function that appends #message with whatever "message" is
var appendMessage = function(message) {
	$("#message").append("<h3>" + message + "</h3>").css("text-align", "center");
}

//a function that updates the shading in the Guess/Hot or Cold?" Table, takes a string of hex value (aka a color)
var colorRecorder = function(color, text) {
	$("#guess" + guessCount).css({
		"background-color": color,
		color: text
	});
	$("#temp" + guessCount).css({
		"background-color": color,
		color: text
	});
};
//a function that updates the values in the "Guess/Hot or Cold?" Table with the most recent guess; takes a string to describe the guess's temperature (e.g, "Hot", "Cold", etc.)
var guessRecorder = function(temperature) {
	$("#guess" + guessCount).text(userInput);
	$("#temp" + guessCount).text(temperature);
};

//a function that sets the screen to a game over screen; feed in color for the body and color for the jumbotron; also disables the input field cause game is over
var GameOver = function(body, jumbotron) {
	$("input").prop("disabled", true);
	$("body").css("background-color", body);
	$(".jumbotron").css("background-color", jumbotron);
}
		
//allow for user input by pressing enter
	$("input").keypress(function(e) {
		if (e.which === 13) {
			$('#Enter-Button button').click();
		}
	});

//fetch the user input with a click--this is the main functionality section
	$("#Enter-Button button").click(function() {
		//set userInput equal to what the user inputted
		userInput = $("input").val();

		//check if the input is still valid; if the input is invalid, tell them
		if (userInput < 1 || userInput > 100 || isNaN(userInput) || userInput%1!==0) {
			changeMessage("Enter a valid integer between 1 and 100!", "");
		}

		//if the input is correct, tell them
		else if (userInput == random) {
			changeMessage("You got it! The answer is " + random + "! You win!", "Congrats!!!");
			guessRecorder("Winner!");
			GameOver("#7FBE7F", "#9FEE9F");
		}

		//check if what the user inputted is a repeat
		else if (userGuesses.indexOf(userInput) !== -1) {
			changeMessage("You already guessed " + userInput + "! Guess again!", "");
		}

		//if the input is valid but not correct, store it, show it on the screen, provide a hint, and continue the game
		else {
			//store the value
			userGuesses.push(userInput);
			difference = Math.abs(random - userInput);

			// check if very hot (difference of 5)
			if (difference <= 5) {
				guessRecorder("Very Hot");
				colorRecorder("#dca7a7", "#a94442");
				changeMessage("You guessed " + userInput + "! You are very hot!", "");
			}
			//check if hot (difference of 15)
			else if (difference > 5 && difference <=15) {
				guessRecorder("Hot");
				colorRecorder("#f2dede", "#a94442");
				changeMessage("You guessed " + userInput + "! You are hot!", "");
			}
			//check if warm (differnece of 25)
			else if (difference > 15 && difference <= 25) {
				guessRecorder("Warm");
				colorRecorder("#fcf8e3", "#8a6d3b");
				changeMessage("You guessed " + userInput + "! You are warm!", "");
			}
			//check if cold (difference > 25 <=40)
			else if (difference > 25 && difference <= 40) {
				guessRecorder("Cold");
				colorRecorder("#afd9ee", "#31708f");
				changeMessage("You guessed " + userInput + "! You are cold!", "");
			}

			//check if very cold (difference > 40)
			else {
				guessRecorder("Very Cold");
				colorRecorder("#5bb1dd", "#31708f");
				changeMessage("You guessed " + userInput + "! You are very cold!", "");
			}

			//see if they need to guess higher or lower compared to the randomly generated value
			if (random>userInput) {
				appendMessage("Guess higher!");
			}
			else {
				appendMessage("Guess lower!");
			}

			//let the user know if they are hotter or colder than their last guess
			if (difference < Math.abs(random - userGuesses[userGuesses.indexOf(userInput) -1]) && difference!==0 && userGuesses.length>1) {
				appendMessage("You're getting hotter!");
			}
			else if (difference > Math.abs(random - userGuesses[userGuesses.indexOf(userInput) -1])){
				appendMessage("You're getting colder!");
			}

			else if (difference == Math.abs(random - userGuesses[userGuesses.indexOf(userInput) -1])) {
				appendMessage("You've sandwiched the answer!");
			}

			//update number of guesses left message
			if (guessCount >=0) {
			//increment GuessCount and show on screen guesses remaining
			guessCount--;
			$("#guess-count").text(guessCount + " Guesses Remaining");
			}
			
			//check if out of guesses
			if (guessCount <= 0) {
				changeMessage("All out of guesses. The number was " + random + ". Game over!", 'Hit "Play Again"');
				GameOver("#6b6b6b", "#999999");
			}
		}
	});

//Guessing Game Auxiliary Functionality
	//click "Hint" to get the answer
	$("#Hint-Button button").click(function() {
		changeMessage("You are a cheater. The answer is " + random + ". Go ahead, type it in.", "");
	});

	//click "play again" and reset the page
	$("#Play-Button button").click(function() {
		location.reload();
	});