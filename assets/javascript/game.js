var passwordList = ["felony", "steal", "pilfer", "criminal", "crime", "hideout", "outlaw", "embezzlement", "dishonest", "booty", "greedy", "illegal", "fugitive", "hacking", "theft"];
var lettersUnpicked = [];
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var currentPassword;
var lettersGuessed = [];
var userGuess;
var pastMisses = [];
var missCount = 0;
var missLimit = 10;
var gamesPlayed = 0;
var updatedPassword = [];
var wins = 0;
var losses = 0;
var gameOver = false;

newGame();

//listens for keypress, updates letters, 
document.onkeydown = function (event) {
	if (missCount < missLimit && !gameOver) {
		userGuess = event.key.toLowerCase();
		updateLetters();
		for (i=0; i<lettersUnpicked.length; i++)
			if (userGuess === lettersUnpicked[i]) {
				console.log('user guess is ' + userGuess);
				var userGuessIndex = lettersUnpicked.indexOf(userGuess);
				console.log(userGuessIndex);
				lettersUnpicked.splice(i, 1);
			}
		checkPassword(userGuess);
	}
}

//button listener, starts new game
document.getElementById("button").addEventListener("click", function(){
	this.className = 'invisible';
    newGame();
});

//increments games played, sets game over to false, picks new password, resets variables
function newGame () {
	gameOver= false;
	blanksContainer.innerHTML = "";
	missCount = 0;
	lettersUnpicked = alphabet.slice();
	lettersGuessed = [];
	updatedPassword = [];
	document.getElementById('notYetPicked').textContent = joinArray(alphabet);
	document.getElementById('alreadyPicked').textContent = "";
	document.getElementById('remaining').innerHTML = 10;
	setPassword ();
}

//picks random password, creates blank for each letter with an id = blank(id)
function setPassword () {
	console.log("setPassword ran");
	currentPassword = passwordList[Math.floor(Math.random() * passwordList.length)];
	console.log(currentPassword);
	var passwordLength = currentPassword.length;
	console.log(passwordLength);
	for (i=0; i < passwordLength; i++) {
		var blanks = document.createElement("span");
		blanks.className = "blank";
		blanks.id = "blank" + i;
		var singleBlank = document.createTextNode("__ ");
		blanks.appendChild(singleBlank);
		var blanksContainer = document.getElementById("blanksContainer");
		blanksContainer.appendChild(blanks);
		updatedPassword.push(i);
	}
}

//checks user guess against letters in password
function checkPassword(guess) {
	document.getElementById('remaining').innerHTML = missLimit - missCount;
	var splitPassword = currentPassword.split("");
	for (i=0; i < splitPassword.length; i++) {
		if (splitPassword[i] === guess) {
			splitPassword.splice(i, 1, guess);
			updatedPassword.splice(i, 1, guess);
			document.getElementById("blank" + i).innerHTML = splitPassword[i] + "&nbsp&nbsp";
		}
		else {
			splitPassword.splice(i, 1, "__ ");
		}	
	}
	checkForWin();
}

//checks if game is won or lost
function checkForWin() {
	if (currentPassword === updatedPassword.join('')) {
		win();
	}
	else if (missCount >= missLimit) {
		lose();
	}
}

//updates stats on win
function win() {
	gamesPlayed++;
	document.getElementById('attempts').innerHTML = gamesPlayed;
	wins++;
	document.getElementById('wins').innerHTML = wins;
	document.getElementById('wins').className = 'stats greenHighlight';
	document.getElementById('attempts').className = 'stats greenHighlight';
	setTimeout (function () {
		document.getElementById('wins').classList.remove('greenHighlight');
		document.getElementById('attempts').classList.remove('greenHighlight');},
	2000);
	playAgain();
}

//updates stats on loss
function lose() {
	gamesPlayed++;
	document.getElementById('attempts').innerHTML = gamesPlayed;
	losses++;
	document.getElementById('losses').innerHTML = losses;
	document.getElementById('losses').className = 'stats redHighlight';
	document.getElementById('attempts').className = 'stats redHighlight';
	setTimeout (function () {
		document.getElementById('losses').classList.remove('redHighlight');
		document.getElementById('attempts').classList.remove('redHighlight');},
	2000);
	playAgain();
}

//removes button and restarts game
function playAgain () {
		gameOver = true;
	console.log('play again ran');
	document.getElementById('button').classList.remove("invisible");
}

//joins arrays
function joinArray (array) {
	result = array.join("  ");
	return result; 
}

//updates displayed letters or gives error feedback
function updateLetters () {
	if (lettersUnpicked.indexOf(userGuess) === -1 && lettersGuessed.indexOf(userGuess) === -1) {
		document.getElementById('feedback').className = 'red';
		document.getElementById('feedback').textContent = 'Um, that is not a letter.';
		setTimeout (function () {
			document.getElementById('feedback').classList.remove('red');
			document.getElementById('feedback').textContent = "";},
			2000);
	}
	else if (lettersUnpicked.indexOf(userGuess) !== -1) {
		missCount++;
		lettersGuessed.push(userGuess);
		lettersUnpicked.splice(lettersUnpicked.indexOf(userGuess), 1);
		document.getElementById('alreadyPicked').textContent = joinArray(lettersGuessed);
		document.getElementById('notYetPicked').textContent = joinArray(lettersUnpicked);
		joinArray (lettersGuessed);
	}
	else {
		document.getElementById('feedback').className = 'red';
		document.getElementById('feedback').textContent = 'You guessed that already.';
		setTimeout (function () {
			document.getElementById('feedback').classList.remove('red');
			document.getElementById('feedback').textContent = "";},
			2000);
	}
}