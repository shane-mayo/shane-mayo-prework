var selectableWords =
    [
        "leonardo",
        "donatello",
        "raphael",
        "michelangelo",
        "shredder",
        "master splinter",
        "april o neil",
        "casey jones",
        "rocksteady",
        "bebop",
        "foot soldier",
        "sewer lair",
        "krang",
    ];

const maxTries = 10;

let guessedLetters = [];
let currentWordIndex;
let currentWord = [];
let remainingGuesses = 0;
let gameStarted = false;
let hasFinished = false;
let wins = 0;

/**
 * function to reset the game to its initial state
 */
function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;

    // get random number to determine which word will be used
    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));


    guessedLetters = [];    // array to store letters guessed by user
    currentWord = [];       // array to store the current word

    // reset the character image text
    document.getElementById("characterImage").src = "";

    
    //  iterate over the chars of the chosen word
    //  if the char at index i is a space, then push a no-break 
    //  space onto the array else push an underscore onto the array
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if (selectableWords[currentWordIndex].charAt(i) === " ") {
            currentWord.push("\xA0");
        } else {
            currentWord.push("_");
        }
    }

    // hide elements corresponding to the game being won/lost from viewport
    document.getElementById("pressKeyTryAgain").style.cssText = "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";

    // update the display to show information changes, i.e. wins, guesses remaining
    updateDisplay();
};

/**
 * function to update the display's contents
 */
function updateDisplay() {

    // change the number of wins is necessary
    document.getElementById("totalWins").innerText = wins;

    // set the current word being used
    document.getElementById("currentWord").innerText = "";
    for (let i = 0; i < currentWord.length; i++) {
        document.getElementById("currentWord").innerText += currentWord[i];
    }

    // update the number of guesses the player has left
    document.getElementById("remainingGuesses").innerText = remainingGuesses;

    // update the letters already used by the player
    document.getElementById("guessedLetters").innerText = guessedLetters;

    // if the player loses display the appropriate images
    if (remainingGuesses <= 0) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        hasFinished = true;
    }
};

/**
 * function to determine if the letter has been used or not
 * if not, determine if the letter is in the word
 * @param {*} letter element that may or may not be contained in the current word
 */
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }

        // if the letter hasn't been used, check to see if it's part of the word or not
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }

    // update the display to include the guessed letter
    updateDisplay();

    // check to see if the player has won the game
    checkWin();
};

/**
 * a function to determine if the letter is contained in the current word
 * @param {*} letter element to be checked against the current word
 */
function evaluateGuess(letter) {
    // Array to store positions of letters in string
    let positions = [];

    // loop over the current word to see if there are any occurences of the
    // the letter in the word
    for (let i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if (selectableWords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    // decrement the number of guesses left
    if (positions.length <= 0) {
        remainingGuesses--;
    } else {
        // if word contains letter change corresponding '_' with a letter.
        for (var i = 0; i < positions.length; i++) {
            currentWord[positions[i]] = letter;
        }
    }
};

/**
 * function to determine if the game has been won
 */
function checkWin() {
    // if no more occurences of "_" exist, the game has been won
    if (currentWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        wins++;
        hasFinished = true;
        displayCharacterImage();
    }
};

/**
 * function to display an image that corresponds with the
 * current word if the player wins the game
 */
function displayCharacterImage() {

    // images corresponding to possible words
    const characterImages = [
        {src: "assets/images/leonardo.jpg"},
        {src: "assets/images/donatello.jpg"},
        {src: "assets/images/raphael.jpg"},
        {src: "assets/images/michelangelo.jpg"},
        {src: "assets/images/shredder.jpg"},
        {src: "assets/images/splinter.png"},
        {src: "assets/images/april.jpg"},
        {src: "assets/images/casey-jones.jpg"},
        {src: "assets/images/rocksteady.png"},
        {src: "assets/images/bebop.png"},
        {src: "assets/images/foot-soldier.png"},
        {src: "assets/images/sewer-lair.jpg"},
        {src: "assets/images/krang.png"},
    ]

    // load the image
    let characterImage = new Image();
    characterImage = characterImages[currentWordIndex].src;
    document.getElementById("characterImage").src = characterImage;
};


/**
 * function to control keypress functionality
 * includes checking to see if the game has been won/lost
 * limits user interaction to a-z on the keyboard while playing
 */
document.onkeydown = function (event) {
    if (hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};

