const Gameboard = (() => {
    const table = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];
    return { table };
})();

const detectWinner = () => {
    let winner;

    for (let i = 0; i < 3; i++) { // for Player 1(X)
        if ((Gameboard.table[i][0] === 'X' && Gameboard.table[i][1] === 'X' && Gameboard.table[i][2] === 'X') || // row check 
            (Gameboard.table[0][i] === 'X' && Gameboard.table[1][i] === 'X' && Gameboard.table[2][i] === 'X') || // column check
            (Gameboard.table[0][0] === 'X' && Gameboard.table[1][1] === 'X' && Gameboard.table[2][2] === 'X') || // diagonal check
            (Gameboard.table[0][2] === 'X' && Gameboard.table[1][1] === 'X' && Gameboard.table[2][0] === 'X')) {
            console.log('Player 1 WON!')
            winner = 'Player 1';
        }
    }

    for (let i = 0; i < 3; i++) {  // for Player 2(O)
        if ((Gameboard.table[i][0] === 'O' && Gameboard.table[i][1] === 'O' && Gameboard.table[i][2] === 'O') || // row check 
            (Gameboard.table[0][i] === 'O' && Gameboard.table[1][i] === 'O' && Gameboard.table[2][i] === 'O') || // column check
            (Gameboard.table[0][0] === 'O' && Gameboard.table[1][1] === 'O' && Gameboard.table[2][2] === 'O') || // diagonal check
            (Gameboard.table[0][2] === 'O' && Gameboard.table[1][1] === 'O' && Gameboard.table[2][0] === 'O')) {
            console.log('Player 2 WON!')
            winner = 'Player 2'
        }
    }

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
        console.log('draw!')
        winner = 'draw';
    }
}

const DisplayController = (() => {
    const cells = document.querySelectorAll('.cell');
    let nextSymbol = '';

    cells.forEach(cell => {
        const row = parseInt(cell.getAttribute('data-row'));
        const col = parseInt(cell.getAttribute('data-column'));
        Gameboard.table[row][col] = '';
        cell.addEventListener('click', () => {
            if (Gameboard.table[row][col] === '' && (nextSymbol === '' || nextSymbol === 'X')) {
                Gameboard.table[row][col] = 'X';
                cell.textContent = Gameboard.table[row][col];
                nextSymbol = 'O';
            } else if (Gameboard.table[row][col] === '' && nextSymbol === 'O') {
                Gameboard.table[row][col] = 'O';
                cell.textContent = Gameboard.table[row][col];
                nextSymbol = 'X';
            }
            detectWinner()
        });
    });
})()








