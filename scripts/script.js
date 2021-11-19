const boardElement = document.querySelector('.grid-board');

const player = (name, symbol) => {
	return {name, symbol};
}

const displayController = (function() {
  //const _modalExitButton = document.querySelector('.button.exit');

  const _clearTheBoardDisplay = () => {
    while(boardElement.firstChild) boardElement.removeChild(boardElement.firstChild);
  }

  //_modalExitButton.addEventListener('click', hideModal);

  const hideModal = () => {
    // TODO
  }

  const render = grid => {
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
    ['X', 'O', ' '],
    ['X', ' ', 'O'],
    ['O', ' ', 'X']
  ]

  const renderGameBoard = () => {
    displayController.render(grid);
  }

  return {renderGameBoard};
})();


