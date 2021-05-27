/* Global Variables */

const guessedLetters = document.querySelector(".guessed-letters");
const guessBtn = document.querySelector(".guess");
const input = document.querySelector(".letter");
const wordDisplay = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const spanRemain = document.querySelector("span");
const message = document.querySelector(".message")
const newGameButton = document.querySelector(".play-again");
const blanks = []
const word = "test";



function displayBlanks(word) {
    for (let i = 0; i < word.length; i++){
        blanks.push("_ ")
    }
    wordDisplay.innerText = blanks.join(" ")
}
displayBlanks(word)

guessBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const guess = e.target.form[0].value;
    console.log(guess)
    input.value = "";
})