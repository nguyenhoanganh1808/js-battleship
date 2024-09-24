export default function gameBoard(leftBoard, rightBoard) {
  const alphaBet = 'ABCDEFGHIJ';
  const leftBoardDiv = document.querySelector('.left-board');
  const rightBoardDiv = document.querySelector('.right-board');
  function updateGameBoard(board, containerDiv) {
    board.forEach((row, i) => {
      if (i === 0) {
        const colIndexText = document.createElement('p');
        colIndexText.textContent = '';
        containerDiv.appendChild(colIndexText);
        for (let j = 0; j < board[0].length; j++) {
          const colIndexText = document.createElement('p');
          colIndexText.textContent = alphaBet[j];
          containerDiv.appendChild(colIndexText);
        }
      }

      const rowIndexText = document.createElement('p');
      rowIndexText.textContent = i + 1;
      containerDiv.appendChild(rowIndexText);

      row.forEach((cell, j) => {
        const button = document.createElement('button');
        button.dataset.rowIndex = i;
        button.dataset.colIndex = j;

        if (cell !== '') {
          const dot = document.createElement('span');
          dot.dataset.rowIndex = i;
          dot.dataset.colIndex = j;
          dot.className = 'dot';
          button.appendChild(dot);
        }
        // if (cell !== '' && cell !== 'hit' && cell !== 'miss') {
        //   button.className = 'have-ship';
        // }
        switch (cell) {
          case 'hit':
            button.className = 'hit';
            break;
          case 'miss':
            button.className = 'miss';
            break;
          case '':
            break;
          default:
            button.className = 'have-ship';
            break;
        }

        // button.textContent = '';

        containerDiv.appendChild(button);
      });
    });
    return containerDiv;
  }

  function updateGameBoards() {
    leftBoardDiv.textContent = '';
    rightBoardDiv.textContent = '';
    updateGameBoard(leftBoard, leftBoardDiv);
    updateGameBoard(rightBoard, rightBoardDiv);
  }
  updateGameBoards();
}
