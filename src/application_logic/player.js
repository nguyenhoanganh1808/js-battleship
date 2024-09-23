import GameBoard from './game_board';

export default function Player(type) {
  const getType = () => type;

  const gameBoard = GameBoard();

  return {
    getType,
    gameBoard,
  };
}
