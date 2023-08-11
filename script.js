let gameEnded = false;
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
                winner = 'Player 1';
            }
        }
        for (let i = 0; i < 3; i++) {  // for Player 2(O)
            if ((Gameboard.table[i][0] === 'O' && Gameboard.table[i][1] === 'O' && Gameboard.table[i][2] === 'O') || // row check 
                (Gameboard.table[0][i] === 'O' && Gameboard.table[1][i] === 'O' && Gameboard.table[2][i] === 'O') || // column check
                (Gameboard.table[0][0] === 'O' && Gameboard.table[1][1] === 'O' && Gameboard.table[2][2] === 'O') || // diagonal check
                (Gameboard.table[0][2] === 'O' && Gameboard.table[1][1] === 'O' && Gameboard.table[2][0] === 'O')) {
                winner = 'Player 2';
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
    if (result === 'Player 1') {
        resultMessage.textContent = 'Player 1 Won!'
    } else if (result === 'Player 2') {
        resultMessage.textContent = 'Player 2 Won!'

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
















