import GameBoard from './game_board';

export default function Player(type, name) {
  const getType = () => type;

  const gameBoard = GameBoard();

  return {
    getType,
    gameBoard,
    name,
  };
}
