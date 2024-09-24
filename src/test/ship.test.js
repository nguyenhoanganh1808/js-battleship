import Ship from '../application_logic/ship';

describe('ship', () => {
  test('should exist', () => {
    expect(Ship).toBeDefined();
    expect(Ship).not.toEqual({});
  });

  test('should accept a number', () => {
    expect(() => Ship('1ko')).toThrow();
  });

  test('hit function should increase the number of hit', () => {
    const newShip = Ship(5);
    newShip.hit();

    expect(newShip.getNumOfHit()).toBe(1);
  });

  test('sunk when length <= num of hit', () => {
    const newShip = Ship(1);
    expect(newShip.isSunk()).toBe(false);
    newShip.hit();

    expect(newShip.isSunk()).toBe(true);
  });
});
