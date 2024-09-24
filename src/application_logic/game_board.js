export default function GameBoard() {
  const rows = 10;
  const columns = 10;
  let board = [];
  let placeMode = 'horizontal';

  const getBoard = () => board;

  const createBoard = () => {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push('');
      }
    }
  };

  function checkPlaceShipHorizontal(ship, row, col) {
    let shipLength = ship.getLength();

    if (shipLength > columns - col) {
      return false;
    }
    const lastCol = col + shipLength;
    // Check if near by row have other ship
    for (let j = col - 1; j < lastCol + 1; j++) {
      if (j < 0) continue;
      if (
        (row - 1 >= 0 && board[row - 1][j] !== '') ||
        (row + 1 <= rows && board[row + 1][j] !== '')
      ) {
        return false;
      }
    }

    if (
      (col - 1 >= 0 && board[row][col - 1] !== '') ||
      (lastCol + 1 <= columns && board[row][lastCol + 1] !== '')
    )
      return false;
    // Check if row have other ship
    for (let j = col; j < columns; j++) {
      if (board[row][j] !== '') {
        return false;
      }
    }
    return true;
  }

  function checkPlaceShipVertical(ship, row, col) {
    let shipLength = ship.getLength();
    if (shipLength > rows - row) {
      return false;
    }

    const lastRow = row + shipLength;

    //check if near by col have ship
    for (let i = row - 1; i < lastRow + 1; i++) {
      if (i < 0) continue;
      if (
        (col - 1 >= 0 && board[i][col - 1] !== '') ||
        (col + 1 < columns && board[i][col + 1] !== '')
      ) {
        return false;
      }
    }

    if (
      (row - 1 >= 0 && board[row - 1][col] !== '') ||
      (row + 1 <= rows && board[row + 1][col] !== '')
    ) {
      return false;
    }

    //check if col have other ship
    for (let i = row; i < rows; i++) {
      if (board[i][col] !== '') {
        return false;
      }
    }

    return true;
  }

  const placeShip = (ship, row, col) => {
    if (placeMode === 'horizontal') {
      if (!checkPlaceShipHorizontal(ship, row, col)) return false;

      for (let j = col; j < col + ship.getLength(); j++) {
        board[row][j] = ship;
      }
    } else {
      if (!checkPlaceShipVertical(ship, row, col)) return false;

      for (let i = row; i < row + ship.getLength(); i++) {
        board[i][col] = ship;
      }
    }
  };

  const receiveAttack = (row, col) => {
    if (board[row][col] === '') {
      board[row][col] = 'miss';
    } else if (board[row][col] === 'hit' || board[row][col] === 'miss') {
      return false;
    } else {
      board[row][col].hit();
      board[row][col] = 'hit';
    }
    return board[row][col];
  };

  const setPlaceMode = (newPlaceMode) => (placeMode = newPlaceMode);

  const isAllShipSunk = () => {
    board.forEach((row) => {
      row.forEach((cell) => {
        if (
          cell !== '' &&
          cell !== 'miss' &&
          cell !== 'hit' &&
          !cell.isSunk()
        ) {
          return false;
        }
      });
    });
    return true;
  };

  return {
    getBoard,
    placeMode,
    createBoard,
    placeShip,
    setPlaceMode,
    receiveAttack,
    isAllShipSunk,
  };
}
