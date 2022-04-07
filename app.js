const cells = document.querySelectorAll('.cell');
const player1 = 'X';
const player2 = 'O';

const resetButton = document.createElement('button');
const quitButton = document.createElement('button');

const winConditions = [
    //horizontal wins
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    //perpendicularly wins
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    //diagonal wins
    ['1', '5', '9'],
    ['3', '5', '7']

]
let playersRound = true;

function game() {


    for (let cell of cells) {

        cell.addEventListener('click', () => {
            if (!cell.innerText && playersRound) {
                cell.classList.toggle('cross');
                cell.innerText = player1;
                playersRound = false;
                checkForWin(player1);
            }
            else if (!cell.innerText && !playersRound) {
                cell.classList.toggle('nought');
                cell.innerText = player2;
                playersRound = true;
                checkForWin(player2);
            }
        });
    }

}

function checkForWin(player) {
    let winCount = 0;
    for (let i = 0; i < winConditions.length; i++) {
        winCount = 0;
        for (let j = 0; j < winConditions[i].length; j++) {
            const c = document.querySelector(`#cell${winConditions[i][j]}`);
            if (c.innerText == player) {
                winCount++;
            }
        }
        if (winCount == 3) {
            return endGame(true, player);
        }
    }
    return checkForTie();

}

//Teoretycznie mozna to wyjebać ale mi się narazie nie chce działa działa
function endGame(condition, player) {

    if (condition) {
        gameState(player, "Win");
    }

}

function checkForTie() {
    let total = 0;
    for (let cell of cells) {
        if (cell.innerText) {
            total++;
        }
    }
    if (total == 9) {
        gameState("Game", "Tied")
    } else {
        return 0;
    }
}

//Original Board 
const origBoard = () => {
    for (let cell of cells) {
        if (cell.innerText == player1) {
            cell.classList.toggle('cross');
        } else if (cell.innerText == player2) {
            cell.classList.toggle('nought');
        }
        cell.classList.toggle('afterWin');
        cell.innerText = "";
        cell.disabled = false;
        cell.style.cursor = "pointer";
    }

    gameResult.style.visibility = "hidden";
    gameResult.style.opacity = '0';

    resetButton.disabled = true;

    playersRound = true;
}

function gameState(player, state) {
    const gameResult = document.querySelector('#gameResult');

    resetButton.classList.add('buttons');
    quitButton.classList.add('buttons');
    resetButton.innerText = "Restart";
    quitButton.innerText = "Quit";
    resetButton.disabled = false;
    resetButton.addEventListener('click', origBoard);
    for (let btn of cells) {
        btn.disabled = true;
        btn.classList.toggle('afterWin');
        btn.style.cursor = 'default';
    }


    gameResult.innerHTML = `<span>${player} <br> ${state}</span><br>`;
    gameResult.appendChild(resetButton);
    gameResult.appendChild(quitButton);
    gameResult.style.visibility = 'visible';
    gameResult.style.opacity = '1';
    return 1;
}


game();