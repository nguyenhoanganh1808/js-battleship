import GameController from '../application_logic/game_controller';
import updateGameBoards from './game_board';
import createRandomMove from '../application_logic/random_coors';

export default function ScreenController() {
  const gameController = GameController();
  const leftBoardDiv = document.querySelector('.left-board');
  const rightBoardDiv = document.querySelector('.right-board');
  const leftPlayerContainer = document.querySelector('.player1');
  const rightPlayerContainer = document.querySelector('.player2');

  gameController.createNewGame(
    { name: 'kira', type: 'real' },
    { name: 'bot', type: 'computer' },
  );

  function updateBoards() {
    const players = gameController.getPlayers();
    const activePlayer = gameController.getActivePlayer();
    if (activePlayer === players[0]) {
      leftPlayerContainer.classList.add('active');
      leftPlayerContainer.classList.remove('inactive');

      rightPlayerContainer.classList.add('inactive');
      rightPlayerContainer.classList.remove('active');
    } else {
      leftPlayerContainer.classList.add('inactive');
      leftPlayerContainer.classList.remove('active');

      rightPlayerContainer.classList.add('active');
      rightPlayerContainer.classList.remove('inactive');
    }
    updateGameBoards(
      players[0].gameBoard.getBoard(),
      players[1].gameBoard.getBoard(),
    );
  }

  updateBoards();

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function checkTheWinner(players) {
    if (players[0].gameBoard.isAllShipSunk()) {
      return players[1];
    }
    if (players[1].gameBoard.isAllShipSunk()) {
      return players[0];
    }
    return false;
  }

  function printWinnerInSinglePlayerMode(players) {
    const winnerText = document.querySelector('.winner');
    const winner = checkTheWinner(players);
    if (winner) {
      if (winner === players[0]) {
        winnerText.textContent = 'YOU WIN, CONGRATS';
      } else {
        winnerText.textContent = 'YOU LOST';
      }
    }
  }

  async function boardClickHandler(e) {
    const players = gameController.getPlayers();
    const activePlayer = gameController.getActivePlayer();
    if (
      (activePlayer === players[0] &&
        e.currentTarget.className === 'left-board') ||
      (activePlayer === players[1] &&
        e.currentTarget.className === 'right-board') ||
      checkTheWinner(players) ||
      e.target.dataset.rowIndex === undefined
    ) {
      return;
    }

    gameController.playRound(
      e.target.dataset.rowIndex,
      e.target.dataset.colIndex,
    );
    printWinnerInSinglePlayerMode(players);
    updateBoards();
    await wait(1000);
    //computer make a move
    if (gameController.getActivePlayer().getType() === 'computer') {
      while (true) {
        const { row, col } = createRandomMove();
        const result = gameController.playRound(row, col);
        await wait(500);

        if (result !== 'hit' && result !== false) break;
      }
    }
    printWinnerInSinglePlayerMode(players);

    updateBoards();
  }

  // leftBoardDiv.addEventListener('click', boardClickHandler);
  rightBoardDiv.addEventListener('click', boardClickHandler);

  function handleResetButton() {
    const players = gameController.getPlayers();

    const hr = document.querySelector('hr');
    hr.classList.add('hidden');
    rightPlayerContainer.classList.add('hidden');
    players[0].gameBoard.createBoard();
    players[1].gameBoard.createBoard();
    updateBoards();
  }

  function handleRandomButton() {
    const players = gameController.getPlayers();
    players[0].gameBoard.placeShipRandomOnBoard();
    // players[1].gameBoard.placeShipRandomOnBoard();
    updateBoards();
  }

  const resetButton = document.querySelector('.reset');
  const randomButton = document.querySelector('.random');
  resetButton.addEventListener('click', handleResetButton);
  randomButton.addEventListener('click', handleRandomButton);
}
