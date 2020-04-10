export const stats = [
  { name: 'level', pad: 3, type: 'info' },
  { name: 'money', pad: 4, type: 'warning' },
  { name:'diamonds', pad: 2, type: 'success' }
];

export const maxPlayers = 4;
export const minBet = 10;
export const expiresIn = '3m';
export const gameStatesColor = {
  waiting: 'warning',
  playing: 'success',
  finished: 'info',
  canceled: 'error',
}
