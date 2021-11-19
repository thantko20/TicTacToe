const boardElement = document.querySelector('.grid-board');

const player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;

	return {getName, getSymbol};
}

const displayController = (function() {
  //const _modalExitButton = document.querySelector('.button.exit');

  function _clearTheBoardDisplay() {
    while(boardElement.firstChild) boardElement.removeChild(boardElement.firstChild);
  }

  //_modalExitButton.addEventListener('click', hideModal);

  const hideModal = () => {
    // TODO
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

  return {render};
})();

const gameBoard = (function() {
  let grid = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  let playerOne = player('Marco', 'X');
  let playerTwo = player('Forrest', 'O');

  let currentPlayer = playerOne;

  function play() {
    _renderGameBoard();
    _listenForCellClick();
  }

  function _changeCurrentPlayer() {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  }

  function _addCell(cell) {
    if(_checkInvalidCell(cell)) return;

    let rowIndex = cell.getAttribute('data-row-index');
    let columnIndex =cell.getAttribute('data-column-index');

    console.log(grid[rowIndex][columnIndex] === currentPlayer.getSymbol())
    
    grid[rowIndex][columnIndex] = currentPlayer.getSymbol();

    _changeCurrentPlayer();
    _renderGameBoard();
  }

  function _listenForCellClick() {
    document.addEventListener('click', e => {
      if(e.target.className === 'cell') _addCell(e.target);
    })
  }

  function _checkInvalidCell(cell) {
    if(cell.innerText !== '') return true;
  }

  function _renderGameBoard() {
    displayController.render(grid);
  }

  return {play};
})();

gameBoard.play();