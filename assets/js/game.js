/* keep at global
needs to be at top for scope */
var guessWordsArr = ["Telescope", "Martian", "Uranus", "Galaxy", "Asteroid", "Spock", "Stellar", "Nebulous", "Cryogenesis", "Vacuum"];

var totalGuesses = 12;

var guess = {
    previousLetters: [],
    remainingGuess: totalGuesses
};

var playerStats = {
    wins: 0,
    currentWord: 0
}

var challengeWord = document.getElementById("challengeWord");

// Get the modal
var modal = document.getElementById('myModal');
var modalText = document.getElementById('modalText');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//on page load, execute
document.addEventListener("load", pageLoad());

// ============================================ //

function pageLoad() {
    //assign initial counts
    updateStats();

    wordLoad(); //call wordLoad function for current challenge word to be loaded
}

// ============================================ //

function wordLoad() {
    var challengeWordDigits = guessWordsArr[playerStats.currentWord].length;

    let resultString = " _".repeat(challengeWordDigits); //build placeholders for challenge word
    challengeWord.textContent = resultString; //overwrite existing text

    btn.style.visibility = 'hidden';
}

//user guess
document.onkeyup = function (event) {

    //get letter typed and make lowercase
    var letter = String.fromCharCode(event.keyCode).toLowerCase();
    var entryChecker = charChecker(letter); //validate key stroke is valid

    //only run if checker is true
    if (entryChecker) {
        pushLetter(letter);
    }
}

// ============================================ //

function charChecker(letter) {
    //make sure entry is of the alphabet only
    var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var isValid = false;

    //loop through array
    alphabet.forEach(function (item) {
        if (item === letter) {
            isValid = true; //flag for valid guess
            return;
        }
    });

    return isValid;
}

// ============================================ //
//add new letter to previous letter array if not already included
function pushLetter(letter) {
    
    var doesNotExist = true; //set flag to assume it's a new letter

    //Check to see if letter was already entered
    guess.previousLetters.forEach(function (item) {
        //if entry found, flag to false
        if (letter === item) {
            doesNotExist = false;
        };
    });

    //if a new entry
    if (doesNotExist) {
        guess.previousLetters.push(letter);//add to guess list
        guess.remainingGuess -= 1;//subtract remaining guesses

        console.log("remaining guess " + guess.remainingGuess);
        console.log("previous letters " + guess.previousLetters);
        console.log("current word " + guessWordsArr[playerStats.currentWord]);

        isEntryInWord(letter);//check if guess is in challenge word
        didPlayerWin();
        outOfGuesses();
        updateStats();

        console.log("current word " + guessWordsArr[playerStats.currentWord]);

    };
}

// ============================================ //

//searching for player guess in challenge word
function isEntryInWord(letter) {
    var challengeWordText = challengeWord.textContent;

    var wordText = guessWordsArr[playerStats.currentWord].toLowerCase();

    //loop through each letter of challenge word and compare
    for (var i = 0; i <= wordText.length-1; i++) {

        //if match is found, replace corresponding underscore placeholder
        if (letter === wordText.charAt(i)) {
            
            //*2 to to map raw challenge word to challenge word with spaces between each underscore
            var beginningPart = challengeWordText.slice(0,i*2);//grab letters up to i*2
            var endPart = challengeWordText.slice(i*2+2);//grab letters after i*2 thru end -- + 2 is to skip over found letter
            
            //overwrite previous challenge word to include letters found
            //concatenate space to not impact string length for future calculations
            challengeWordText = beginningPart + " " + letter + endPart;
        }
    }
    //update challenge word with letters found
    challengeWord.textContent = challengeWordText;

}

// ============================================ //

function didPlayerWin(){
    var remainingChallengeText = challengeWord.textContent;

    if(remainingChallengeText.indexOf('_') > -1) {
        //player has not won yet
    } else {
        //get accomplished challenge word before it updates
        var wordName = guessWordsArr[playerStats.currentWord];
        playerStats.wins += 1;
        gameReset();

        //update modal for recent win
        modalText.innerHTML = "<p>Nice Job! You figured out the word was <b>" + wordName + "</b>!</p>"
        modal.style.display = "block";//display modal    
    }
}

// ============================================ //

function updateStats() {
    var winCount = document.getElementById("wins");
    var guessesRemainingCount = document.getElementById("guessRemaining");
    var lettersGuessed = document.getElementById("lettersGuessed");

    winCount.innerHTML = "<b>Wins:</b> " + playerStats.wins;
    guessesRemainingCount.innerHTML = "<b>Guesses Remaining: </b>" + guess.remainingGuess;

    //print 'none' if player hasn't anything guesses yet
    if (guess.previousLetters.length == 0) {
        lettersGuessed.innerHTML = "<b>Letters Guessed: </b>" + "none";
    } else {
        lettersGuessed.innerHTML = "<b>Letters Guessed: </b>" + guess.previousLetters;
    }

}

// ============================================ //
function outOfGuesses(){
    if (guess.remainingGuess === 0) {
        alert("Ahh shucks! You didn't get the word...\n\nBetter luck on the next word!");
        gameReset();
    }
}
function gameReset() {
    
        if (playerStats.currentWord === guessWordsArr.length - 1) { //if player is on last word
            playerStats.currentWord = 0;//start with first word
        } else {
            playerStats.currentWord += 1;//else go to next word
        }

        wordLoad();//load next word

        //clear previous guesses
        guess.previousLetters = [];
        guess.remainingGuess = totalGuesses;
}

// }