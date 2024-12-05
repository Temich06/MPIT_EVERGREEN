//https://thecode.media/wordle-2/
const WORDS = ['qwertyu']

const NUMBER_OF_GUESSES = 6

let guessesRemaining = NUMBER_OF_GUESSES;

let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]

const LEN = rightGuessString.length

let nextLetter = 0

let currentGuess = [];

document.write(rightGuessString)

function initBoard() {
    // получаем доступ к блоку на странице
    let board = document.getElementById("game-board");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        // создаём новый блок на странице
        let row = document.createElement("div")
        // добавляем к нему класс, чтобы потом работать со строками напрямую
        row.className = "letter-row"
        
        // создаём отдельные клетки
        // добавляем по 5 клеток в ряд
        for (let j = 0; j < LEN; j++) {
            // создаём новый блок на странице
            let box = document.createElement("div")
            // добавляем к нему класс
            box.className = "letter-box"
            // вкладываем новый блок внутрь блока со строкой
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}
function insertLetter(pressedKey) {
    if (nextLetter === LEN) {
        return
    }

    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];

    let box = row.children[nextLetter];

    box.textContent = pressedKey;

    box.classList.add('filled-box');

    currentGuess.push(pressedKey);

    nextLetter += 1;

}

function deleteLetter() {
    
    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];

    let box = row.children[nextLetter - 1];

    box.textContent = "";

    box.classList.remove("filled-box");

    currentGuess.pop();

    nextLetter -= 1;

}

function checkGuess() {
    
    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];

    let guessString = "";

    let rightGuess = Array.from(rightGuessString);

    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length != LEN) {
        toastr.error('Не все буквы!');

        return;
    }

    if (!WORDS.includes(guessString)) {
        toastr.error('Такого слова нету в словаре');

        return;
    }

    for (let i = 0; i < LEN; i++) {
        let letterColor = ''

        let box = row.children[i]

        let letter = currentGuess[i]

        let letterPositsion = rightGuess.indexOf(currentGuess[i])

        if (letterPositsion === -1) {
            letterColor = 'grey'
        } else {
            if (currentGuess[i] === rightGuess[i]){
                letterColor = 'green'
            } else {
                letterColor = 'yellow'
            }

            rightGuess[letterPositsion] = "#";
        }
        box.style.backgroundColor = letterColor;
    }
    if (guessString === rightGuessString) {
        
        toastr.success('You WIN');

        guessesRemaining = 0;

        return;
    } else {
        guessesRemaining -= 1;

        currentGuess = [];

        nextLetter = 0;

        if (guessesRemaining === 0) {
            
            toastr.error('You LOSER');

            toastr.info(`Загаданное слово: "${rightGuessString}"`);
        }
    }
}

document.addEventListener("keydown", (e) => {

    if (guessesRemaining === 0) {
        return
    }

    let pressedKey = String(e.key).toLowerCase();

    if (pressedKey === "backspace" && nextLetter !== 0) {

        deleteLetter();

        return;
    }

    if (pressedKey === "enter") {
        checkGuess();

        return;
    }
    let found = pressedKey.match(/[a-z]/gi);

    if (!found || found.length > 1) {
        return;
    } else {
        insertLetter(pressedKey);
    }
    }
)
initBoard()