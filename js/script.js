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
let word = "";
let guessesLeft = 8;

function getRandom(textData) {
    let random = Math.floor(Math.random() * textData.length);
    word = textData[random];
    return word;
}

const grabWord = async function (){
    const data = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const textData = await data.text();
    const wordArr = textData.split("\n");
    word = getRandom(wordArr).trim();
    console.log(word);
    return word
}

function displayBlanks(word) {
    for (let i = 0; i < word.length; i++){
        blanks.push("_ ");
    }
    wordDisplay.innerText = blanks.join(" ");
}

function validateInput(guess) {
    // accept only letters
    const accept = /[a-zA-Z]/;
    if (guess.length === 0) {
        message.innerText = "Please enter a letter";
    } else if (guess.length > 1) {
        message.innerText = "Please enter only one letter";
    }else if  (!guess.match(accept)) {
        message.innerText = "You can only enter a single character from A to Z";
    } else {
        console.log("good input");
        return guess;
    }
}

function makeGuess(letter) {
    const altLetter = letter.toUpperCase();
    if (guesses.includes(altLetter)) {
        message.innerText = "You've already guessed that letter! Try again.";
        } else {
        guesses.push(altLetter);
        console.log(guesses);
        showUserGuesses();
        calcGameProgress(altLetter);
        updateWordDisplay(guesses);
        checkForWin(word);
    }
}

function calcGameProgress(altLetter) {
    const uWord = word.toUpperCase();
  if (!uWord.includes(altLetter)) {
    message.innerText = `Sorry, the word doesn't contain ${altLetter}. Keep Trying`;
    guessesLeft -= 1;
  } else {
    message.innerText = `Great guess!  ${altLetter} is in the letter`;
  }
  if (guessesLeft === 0) {
      gameOver();
  } else if (guessesLeft === 1) {
      message.innerText = "Only one guess left!";
    spanRemain.innerText = `${guessesLeft} guess`;
  } else {
    spanRemain.innerText = `${guessesLeft} guesses`;
  }
};

function gameOver() {
    message.innerText = `Game over! The word was ${word}`;
    spanRemain.innerText = "0 guesses";
    guessBtn.disabled = true;
    newGameButton.classList.remove("hide");
}


function showUserGuesses() {
    guessedDisplay.innerHTML = "";
    for (let guess of guesses) {
        let listItem = document.createElement("li");
        listItem.innerText = guess;
        guessedDisplay.append(listItem);
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
  
    console.log(rightWord);
    wordDisplay.innerText = rightWord.join("")
    console.log(wordDisplay.innerText);
}

function checkForWin(word) {
    if (word.toUpperCase() === wordDisplay.innerText) {
        message.classList.add("win");
        message.innerText = "Great Job! You've guessed the word.";
        guessBtn.disabled = true;
        newGameButton.classList.remove("hide");
    }
}

function startNew() {
    grabWord();
    displayBlanks(word);
    guessBtn.disabled = false;
    newGameButton.classList.add("hide");
    guessesLeft = 8;
    spanRemain.innerText = `${guessesLeft} guesses`;
    message.innerText = "";
}

// Game sequence

grabWord().then(result => displayBlanks(result));



//EVENT LISTENER FOR GUESS BUTTON

guessBtn.addEventListener("click", (e) => {
    e.preventDefault();
    message.innerText = "";
    const guess = e.target.form[0].value;
    console.log(guess);
    input.value = "";
    let validated = validateInput(guess);
    if (validated) {
        makeGuess(validated);
    }
})
