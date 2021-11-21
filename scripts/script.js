const boardElement = document.querySelector('.grid-board');

const player = (name, symbol) => {
  const getSymbol = () => symbol;

	return {name, getSymbol};
}

const displayController = (function() {
  const overlayElement = document.querySelector('.overlay');
  // const askPlayersNamesForm = document.querySelector('form.pvp');

  function listenNamesSubmit() {
      let playerNames = {};
      playerNames.p1Name = document.querySelector('.p1-name').value;
      playerNames.p2Name = document.querySelector('.p2-name').value;
      overlayElement.style.display = 'none';
      
      return playerNames;
  }

  function _clearTheBoardDisplay() {
    while(boardElement.firstChild) boardElement.removeChild(boardElement.firstChild);
  }

  function render(grid) {
    _clearTheBoardDisplay();
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const cellElement = document.createElement('div');
        cellElement.className = `cell`;
        cellElement.setAttribute('data-row-index', i);
        cellElement.setAttribute('data-column-index', j);
        cellElement.innerText = grid[i][j];

        boardElement.appendChild(cellElement);
      }
    }
  }

  return {render, listenNamesSubmit};
})();

const gameBoard = (function() {
  let grid = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  const getGrid = () => grid;

  function play() {
    _renderGameBoard();
    _listenForCellClick();
  }

  function _updateBoard(cell, currentPlayer) {
    if(_checkInvalidCell(cell)) return;

    let rowIndex = cell.getAttribute('data-row-index');
    let columnIndex =cell.getAttribute('data-column-index');
    
    grid[rowIndex][columnIndex] = currentPlayer.getSymbol();
  }

  function _checkInvalidCell(cell) {
    if(cell.innerText !== '') return true;
  }

  return {getGrid, _updateBoard, _checkInvalidCell};
})();

const gameOverChecker = (function() {
  let grid = gameBoard.getGrid();

  function checkWin() {
    if(_checkHorizontalRow() || _checkVerticalRow() || _checkDiagonalRows()) return true;
  }

  function _checkHorizontalRow() {
    for(let i = 0; i < grid.length; i++) {
      if(_compareThreeCells(grid[i][0], grid[i][1], grid[i][2])) return true;
    }
  }

  function _checkVerticalRow() {
    // TODO
    for(let i = 0; i < grid[0].length; i++) {
      if(_compareThreeCells(grid[0][i], grid[1][i], grid[2][i])) return true;
    }
  }

  function _checkDiagonalRows() {
    return _checkLeftDiagonalRow() || _checkRightDiagonalRow();
  }

  function _checkLeftDiagonalRow() {
    return _compareThreeCells(grid[0][0], grid[1][1], grid[2][2]);
  }

  function _checkRightDiagonalRow() {
    return _compareThreeCells(grid[0][2], grid[1][1], grid[2][0]);
  }

  function _compareThreeCells(firstCell, secondCell, thirdCell) {
    return firstCell !== '' && firstCell === secondCell && firstCell === thirdCell;
  }

  function checkDraw() {
    let drawChecker = true;
    grid.forEach(row => {
      if(row.some(cell => cell === '')){
        drawChecker = false;
        return;
      }
    })

    return drawChecker;
  }

  return {checkWin, checkDraw};
})();

const game = (function() {
  let grid = gameBoard.getGrid();

  const nameSubmit = document.querySelector('.pvp button')

  let playerOne;
  let playerTwo;

  let currentPlayer;

  function play() {
    nameSubmit.addEventListener('click', assignPlayers);
    _renderGameBoard();
    _listenForCellClick();
  }

  function _listenForCellClick() {
    document.addEventListener('click', e => {
      if(e.target.className === 'cell' && !gameBoard._checkInvalidCell(e.target)){
        gameBoard._updateBoard(e.target, currentPlayer);
        _renderGameBoard();
        if(gameOverChecker.checkWin()) {
          // DO SOMETHING
          console.log(`${currentPlayer.name} wins!`);
          return;
        }
        if(gameOverChecker.checkDraw()) {
          // DO SOMETHING
          console.log('Draw!');
        }
        _changeCurrentPlayer();
      }   
    });
  }

  function _changeCurrentPlayer() {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  }

  function assignPlayers() {
    let playerOneName = displayController.listenNamesSubmit().p1Name;
    let playerTwoName = displayController.listenNamesSubmit().p2Name;

    playerOne = player(playerOneName, "X");
    playerTwo = player(playerTwoName, "O");
    currentPlayer = playerOne;
  }

  function _renderGameBoard() {
    displayController.render(grid);
  }

  return {play};
})();

game.play();