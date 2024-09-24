import Player from './player';
import Ship from './ship';

export default function GameController() {
  let players = [];
  let activePlayer;
  let inactivePlayer;

  const createNewGame = (newPlayer1, newPlayer2) => {
    players.push(Player(newPlayer1.type, newPlayer1.name));
    players.push(Player(newPlayer2.type, newPlayer2.name));

    const carrier = Ship(5);
    const battleShip = Ship(4);
    const destroyer = Ship(3);
    const submarine = Ship(3);
    const patrolBoat = Ship(2);

    players[0].gameBoard.placeShip(carrier, 0, 0);
    players[0].gameBoard.placeShip(battleShip, 2, 0);
    players[0].gameBoard.placeShip(destroyer, 4, 0);
    players[0].gameBoard.placeShip(submarine, 6, 0);
    players[0].gameBoard.placeShip(patrolBoat, 8, 0);

    const carrier2 = Ship(5);
    const battleShip2 = Ship(4);
    const destroyer2 = Ship(3);
    const submarine2 = Ship(3);
    const patrolBoat2 = Ship(2);

    players[1].gameBoard.placeShip(carrier2, 0, 0);
    players[1].gameBoard.placeShip(battleShip2, 2, 0);
    players[1].gameBoard.placeShip(destroyer2, 4, 0);
    players[1].gameBoard.placeShip(submarine2, 6, 0);
    players[1].gameBoard.placeShip(patrolBoat2, 8, 0);

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
    if (result !== 'hit') {
      changePlayer();
    }
  };

  const isGameOver = () => inactivePlayer.gameBoard.isAllShipSunk();

  return {
    createNewGame,
    getPlayers,
    playRound,
    isGameOver,
  };
}
