import Player from './player';

export default function GameController() {
  let player1;
  let player2;
  let currentPlayer = player1;

  const createNewGame = (newPlayer1, newPlayer2) => {
    player1 = Player(newPlayer1.type, newPlayer1.name);
    player2 = Player(newPlayer2.type, newPlayer2.name);
  };

  const changePlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  const currentPlayerMadeAMove = (row, col) => {
    const result = currentPlayer.board.receiveAttack(row, col);
    changePlayer();
    return result;
  };

  return {
    createNewGame,
    currentPlayerMadeAMove,
  };
}
