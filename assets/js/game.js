// var isGameDone = false

//continue presenting new guess words while false
// while (!isGameDone) {

//array of guess words
var guessWordsArr = ["Telescope", "Martian", "Uranus", "Galaxy", "Asteroid", "Spock", "Stellar", "Nebulous", "Cryogenesis", "Vacuum"];

var guess = {
    previousLetters: [],
    remainingGuess: 10
}
//user guess
document.onkeyup = function (event) {

    //get letter typed and make lowercase
    var letter = String.fromCharCode(event.keyCode).toLowerCase();
    var entryChecker = charChecker(letter);

    //only run if checker is true
    if (entryChecker) {
        pushLetter(letter);
    } else {
        alert("Only letters of the alphabet are accepted.");
    }

}

function pushLetter(letter) {
    //add new letter to previous letter array if not already included

    var doesNotExist = true; //set flag

    guess.previousLetters.forEach(function (item) {
        //if entry found, flag
        if (letter === item) {
            doesNotExist = false;
        };
    });

    //only add new letters
    if (doesNotExist) {
        guess.previousLetters.push(letter);
        guess.remainingGuess -= 1;
    };
}

function charChecker(letter) {
    //make sure entry is of the alphabet only
    var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var isValid = false;

    //loop through array
    alphabet.forEach(function (item) {
        if (item === letter) {
            isValid = true;//flag for valid guess
            return;
        }
    });

    return isValid;
}


// }