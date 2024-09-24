import GameController from '../application_logic/game_controller';
import updateGameBoards from './game_board';

export default function ScreenController() {
  const gameController = GameController();
  const leftBoardDiv = document.querySelector('.left-board');
  const rightBoardDiv = document.querySelector('.right-board');

  gameController.createNewGame(
    { name: 'kira', type: 'real' },
    { name: 'bot', type: 'computer' },
  );

  function updateBoards() {
    const players = gameController.getPlayers();

    updateGameBoards(
      players[0].gameBoard.getBoard(),
      players[1].gameBoard.getBoard(),
    );
  }
  updateBoards();

  function boardClickHandler(e) {
    const activePlayer = console.log(e.target.dataset.rowIndex);
    if (e.target.dataset.rowIndex === undefined) {
      return;
    }
    gameController.playRound(
      e.target.dataset.rowIndex,
      e.target.dataset.colIndex,
    );
    updateBoards();
  }

  leftBoardDiv.addEventListener('click', boardClickHandler);
  rightBoardDiv.addEventListener('click', boardClickHandler);
}
