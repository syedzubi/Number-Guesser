//Normal Variables
let min = 1,
    max = 10,
    winningNum = getRandomNumber(min, max),
    guessesLeft = 3;

//UI elements

const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessNum = document.querySelector('#guess-num'),
    guessBtn = document.querySelector('#guess-value'),
    message = document.querySelector('.message');

//assigning the value of UI and normal variables 

minNum.value = min;
maxNum.value = max;

//adding an event listener to the game , we do not listen to click as we want only the specific mouse down to change its value.

game.addEventListener('mousedown', function(e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});
//Adding an event listener to the submit button

guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessNum.value);

    if (isNaN(guess) || guess < min || guess > max) {

        setMessage(`Please enter a value between ${min} and ${max}`, 'red');
    }

    if (guess === winningNum) {
        //Gameover you won
        gameOver(true, `${winningNum} is correct, YOU WIN`);
    } else {
        //Wrong number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            //Gameover lost

            gameOver(false, `Game over , YOU LOST. The correct number was ${winningNum}`);
        } else {
            //Game continues - answer wrong 
            guessNum.style.borderColor = 'red';

            guessNum.value = '';

            setMessage(`${guess} is not correct , ${guessesLeft} guesses left`, 'red');

        }
    }

});

function gameOver(won, msg) {

    let color;

    won === true ? color = 'green' : color = 'red';
    guessNum.disabled = true;

    guessNum.style.borderColor = color;

    message.style.color = color;

    setMessage(msg, color);

    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';

}


function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

function getRandomNumber(min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min);
}