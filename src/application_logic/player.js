import GameBoard from './game_board';

export default function Player(type, name) {
  const getType = () => type;

  const gameBoard = GameBoard();
  gameBoard.createBoard();

  const createRandomMove = () => {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);
    return {
      row,
      col,
    };
  };

  return {
    getType,
    gameBoard,
    name,
    createRandomMove,
  };
}
