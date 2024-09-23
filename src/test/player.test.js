import Player from '../application_logic/player';

describe('player', () => {
  test('should exist', () => {
    expect(Player).toBeDefined();
  });

  test('should have two type of player', () => {
    const player = Player('real');

    expect(player.getType()).toMatch('real');
  });
});
