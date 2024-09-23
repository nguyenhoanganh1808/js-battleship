import GameBoard from '../application_logic/game_board';
import Ship from '../application_logic/ship';

describe('game board', () => {
  test('should exist', () => {
    expect(GameBoard).toBeDefined();
  });

  test('should be 10x10 board size', () => {
    const board = GameBoard();
    board.createBoard();
    expect(board.getBoard()).toHaveLength(10);

    board.getBoard().forEach((cell) => {
      expect(cell).toHaveLength(10);
    });
  });

  test('should place ship at specified coors', () => {
    const board = GameBoard();
    board.createBoard();

    const newShip = Ship(3);
    expect(board.placeShip(newShip, 0, 8)).toBe(false);

    board.placeShip(newShip, 0, 0);

    expect(board.getBoard()[0]).toEqual(
      expect.arrayContaining([newShip, newShip, newShip]),
    );
  });

  test('should not be place on a exist ship', () => {
    const board = GameBoard();
    board.createBoard();

    const newShip = Ship(3);
    board.placeShip(newShip, 0, 0);
    expect(board.placeShip(newShip, 0, 0)).toBe(false);
  });

  test('should not be place near other ship', () => {
    const board = GameBoard();
    board.createBoard();

    const newShip = Ship(3);
    board.placeShip(newShip, 0, 0);
    expect(board.placeShip(newShip, 1, 0)).toBe(false);
    expect(board.placeShip(newShip, 0, 3)).toBe(false);
    expect(board.placeShip(newShip, 1, 3)).toBe(false);
  });

  // test('display vertical', () => {
  //   const board = GameBoard();
  //   board.createBoard();
  //   board.placeMode = 'vertical';

  //   const newShip = Ship(3);
  //   board.placeShip(newShip, 0, 0);
  //   expect(board.placeShip(newShip, 0, 0)).toBe(false);
  //   expect(board.placeShip(newShip, 0, 1)).toBe(false);
  //   expect(board.placeShip(newShip, 8, 1)).toBe(false);
  // });

  // test('get and set place mode', () => {
  //   const board = GameBoard();
  //   board.createBoard();

  // })

  test('receive attack', () => {
    const board = GameBoard();
    board.createBoard();

    const newShip = Ship(3);

    board.placeShip(newShip, 0, 0);

    expect(board.receiveAttack(0, 0)).toBe('hit');
    expect(board.receiveAttack(1, 0)).toBe('miss');
    expect(board.getBoard()[0][0]).toBe('hit');
    expect(board.receiveAttack(1, 0)).toBe(false);

    board.receiveAttack(0, 1);
    board.receiveAttack(0, 2);

    expect(newShip.isSunk()).toBe(true);
  });

  test('should be able to report whether or not all of their ships have been sunk', () => {
    const board = GameBoard();
    board.createBoard();

    const ship1 = Ship(3);
    const ship2 = Ship(1);
    board.placeShip(ship1, 0, 0);
    board.placeShip(ship1, 1, 0);
  });
});
