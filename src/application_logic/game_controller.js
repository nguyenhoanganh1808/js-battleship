import Player from './player';
import Ship from './ship';

export default function GameController() {
  let players = [];
  let activePlayer;
  let inactivePlayer;

  const createNewGame = (newPlayer1, newPlayer2) => {
    const newPlayersList = [
      Player(newPlayer1.type, newPlayer1.name),
      Player(newPlayer2.type, newPlayer2.name),
    ];
    players = newPlayersList;

    activePlayer = players[0];
    inactivePlayer = players[1];
  };

  const changePlayer = () => {
    if (activePlayer === players[0]) {
      activePlayer = players[1];
      inactivePlayer = players[0];
    } else {
      activePlayer = players[0];
      inactivePlayer = players[1];
    }
  };

  const getPlayers = () => players;

  const playRound = (row, col) => {
    const result = inactivePlayer.gameBoard.receiveAttack(row, col);

    if (result === 'miss') {
      changePlayer();
    }
    return result;
  };

  const getActivePlayer = () => activePlayer;
  const getInactivePlayer = () => inactivePlayer;

  return {
    createNewGame,
    getPlayers,
    playRound,
    getActivePlayer,
    getInactivePlayer,
  };
}
