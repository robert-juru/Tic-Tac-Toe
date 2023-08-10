const Gameboard = (() => {
    const table = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];
    return { table };
})();



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








