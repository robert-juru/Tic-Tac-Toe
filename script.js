let gameEnded = false;
let player1NameInput;
let player2NameInput;

const initializeModal = (() => {
    document.addEventListener("DOMContentLoaded", () => {
        const modal = document.getElementById("myModal");
        const submitButton = document.getElementById("submitNames");
        const displayPlayer1Name = document.getElementById("displayPlayer1Name");
        player1NameInput = document.getElementById("player1Name");
        player2NameInput = document.getElementById("player2Name");
        modal.style.display = "block";

        submitButton.addEventListener("click", () => {
            const player1Name = player1NameInput.value;
            const player2Name = player2NameInput.value;
            displayPlayer1Name.textContent = player1Name + ": X";
            displayPlayer2Name.textContent = player2Name + ": O";
            displayPlayer1Name.style.fontSize = "24px"
            displayPlayer2Name.style.fontSize = "24px"
            modal.style.display = "none";
        });
    });
})()

const Gameboard = (() => {
    const table = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];
    return { table };
})();

let DetectResult = (() => {
    let winner = null;
    const checkWinner = () => {
        for (let i = 0; i < 3; i++) { // for Player 1(X)
            if ((Gameboard.table[i][0] === 'X' && Gameboard.table[i][1] === 'X' && Gameboard.table[i][2] === 'X') || // row check 
                (Gameboard.table[0][i] === 'X' && Gameboard.table[1][i] === 'X' && Gameboard.table[2][i] === 'X') || // column check
                (Gameboard.table[0][0] === 'X' && Gameboard.table[1][1] === 'X' && Gameboard.table[2][2] === 'X') || // diagonal check
                (Gameboard.table[0][2] === 'X' && Gameboard.table[1][1] === 'X' && Gameboard.table[2][0] === 'X')) {
                winner = player1NameInput;
            }
        }
        for (let i = 0; i < 3; i++) {  // for Player 2(O)
            if ((Gameboard.table[i][0] === 'O' && Gameboard.table[i][1] === 'O' && Gameboard.table[i][2] === 'O') || // row check 
                (Gameboard.table[0][i] === 'O' && Gameboard.table[1][i] === 'O' && Gameboard.table[2][i] === 'O') || // column check
                (Gameboard.table[0][0] === 'O' && Gameboard.table[1][1] === 'O' && Gameboard.table[2][2] === 'O') || // diagonal check
                (Gameboard.table[0][2] === 'O' && Gameboard.table[1][1] === 'O' && Gameboard.table[2][0] === 'O')) {
                winner = player2NameInput;
            }
        }
        return winner;
    }
    const checkDraw = () => {
        let allCellsFilled = true;
        for (let i = 0; i < 3; i++) { // for draw
            for (let j = 0; j < 3; j++) {
                if (Gameboard.table[i][j] === '') {
                    allCellsFilled = false;
                    break;
                }
            }
        }
        if (allCellsFilled) {
            return true;
        }
        return false;
    }

    const resetWinner = () => {
        winner = null;
        return winner;
    };
    return { checkWinner, checkDraw, resetWinner }
})()

let handleGameResult = () => {
    let resultMessage = document.querySelector('.result-message')
    const result = DetectResult.checkWinner();
    if (result === player1NameInput) {
        resultMessage.textContent = `${player1NameInput.value} is the winner!`
    } else if (result === player2NameInput) {
        resultMessage.textContent = `${player2NameInput.value} is the winner!`

    } else if (DetectResult.checkDraw()) {
        resultMessage.textContent = 'Draw!'
    }
    return result;
};

let DisplayController = (() => {
    const cells = document.querySelectorAll('.cell');
    let nextSymbol = '';
    cells.forEach(cell => {
        const row = parseInt(cell.getAttribute('data-row'));
        const col = parseInt(cell.getAttribute('data-column'));
        Gameboard.table[row][col] = '';
        const clickHandler = () => {
            if (gameEnded) return;
            if (Gameboard.table[row][col] === '' && (nextSymbol === '' || nextSymbol === 'X')) {
                Gameboard.table[row][col] = 'X';
                cell.textContent = Gameboard.table[row][col];
                nextSymbol = 'O';
            } else if (Gameboard.table[row][col] === '' && nextSymbol === 'O') {
                Gameboard.table[row][col] = 'O';
                cell.textContent = Gameboard.table[row][col];
                nextSymbol = 'X';
            }
            if (DetectResult.checkWinner() || DetectResult.checkDraw()) {
                handleGameResult();
                gameEnded = true;
            }
        };
        cell.addEventListener('click', clickHandler);
    });
    return { cells, gameEnded };
})();

let resetGame = (() => {
    const cells = DisplayController.cells;
    let resultMessage = document.querySelector('.result-message')
    let replayButton = document.querySelector('.replay-button');

    replayButton.addEventListener('click', () => {
        gameEnded = false;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                Gameboard.table[i][j] = '';
                cells.forEach(cell => {
                    cell.textContent = ''
                })
            }
        }
        DetectResult.resetWinner()
        resultMessage.textContent = '';
    })
})()
