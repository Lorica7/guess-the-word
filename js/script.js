/* Global Variables */

const guessedDisplay = document.querySelector(".guessed-letters");
const guessBtn = document.querySelector(".guess");
const input = document.querySelector(".letter");
const wordDisplay = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const spanRemain = document.querySelector("span");
const message = document.querySelector(".message");
const newGameButton = document.querySelector(".play-again");
const blanks = [];
const guesses = [];
let word = "test";
let guessesLeft = 8;


function displayBlanks(word) {
    for (let i = 0; i < word.length; i++){
        blanks.push("_ ")
    }
    wordDisplay.innerText = blanks.join(" ")
}

function validateInput(guess) {
    // accept only letters
    const accept = /[a-zA-Z]/;
    if (guess.length === 0) {
        message.innerText = "Please enter a letter"
    } else if (guess.length > 1) {
        message.innerText = "Please enter only one letter" 
    }else if  (!guess.match(accept)) {
        message.innerText = "You can only enter a single character from A to Z"
    } else {
        console.log("good input")
        return guess
    }
}

function makeGuess(letter) {
    const altLetter = letter.toUpperCase();
    if (guesses.includes(altLetter)) {
        message.innerText = "You've already guessed that letter! Try again."
        } else {
        guesses.push(altLetter);
        guessesLeft -= 1;
        spanRemain.innerText = `${guessesLeft} guesses`
        console.log(guesses)
        updateUserGuesses();
        updateWordDisplay(guesses)
        checkForWin(word)
    }
}


function updateUserGuesses() {
    guessedDisplay.innerHTML = "";
    for (let guess of guesses) {
        let listItem = document.createElement("li");
        listItem.innerText = guess;
        guessedDisplay.append(listItem)
    }
}

function updateWordDisplay(array) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    let rightWord = [];
    for (let item of wordArray) {
        if (array.includes(item)) {
            rightWord.push(item.toUpperCase());
           
        } else {
            rightWord.push("_")
        }
    }
  
    console.log(rightWord)
    wordDisplay.innerText = rightWord.join("")
    console.log(wordDisplay.innerText)
}

function checkForWin(word) {
    if (word.toUpperCase() === wordDisplay.innerText) {
        message.classList.add("win");
        message.innerText = "Great Job! You've guessed the word."
    }
}


// Game sequence

displayBlanks(word)

//EVENT LISTENER FOR GUESS BUTTON

guessBtn.addEventListener("click", (e) => {
    e.preventDefault();
    message.innerText = "";
    const guess = e.target.form[0].value;
    console.log(guess)
    input.value = ""
   let validated =  validateInput(guess)
    if (validated) {
        makeGuess(validated)
    }
})
