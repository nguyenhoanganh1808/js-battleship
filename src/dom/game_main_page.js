import GameController from '../application_logic/game_controller';
import updateGameBoards from './game_board';

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

  async function boardClickHandler(e) {
    const players = gameController.getPlayers();
    const activePlayer = gameController.getActivePlayer();
    const winnerText = document.querySelector('.winner');
    console.log(e.currentTarget.className);
    if (
      (activePlayer === players[0] &&
        e.currentTarget.className === 'left-board') ||
      (activePlayer === players[1] &&
        e.currentTarget.className === 'right-board') ||
      e.target.dataset.rowIndex === undefined
    ) {
      return;
    }

    gameController.playRound(
      e.target.dataset.rowIndex,
      e.target.dataset.colIndex,
    );

    if (gameController.isGameOver()) {
      winnerText.textContent = 'You win';
      return;
    }

    updateBoards();
    await wait(1000);
    //computer make a move
    if (gameController.getActivePlayer().getType() === 'computer') {
      while (true) {
        const { row, col } = activePlayer.createRandomMove();
        console.log('am');
        console.log(row);
        const result = gameController.playRound(row, col);
        await wait(500);

        if (result !== 'hit' && result !== false) break;
      }
    }
    if (gameController.isGameOver()) {
      winnerText.textContent = 'You lost';
    }

    updateBoards();
  }

  // leftBoardDiv.addEventListener('click', boardClickHandler);
  rightBoardDiv.addEventListener('click', boardClickHandler);
}
