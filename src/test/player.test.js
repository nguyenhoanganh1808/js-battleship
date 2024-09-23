import Player from '../application_logic/player';

describe('player', () => {
  test('should exist', () => {
    expect(Player).toBeDefined();
  });

  test('should have two type of player', () => {
    const player = Player('real');

    expect(player.getType()).toMatch('real');
  });

  test('each player should contain their own game board', () => {
    const player1 = Player('real');
    const player2 = Player('computer');

    expect(player1.gameBoard).toBeDefined();
    expect(player2.gameBoard).toBeDefined();
  });
});
