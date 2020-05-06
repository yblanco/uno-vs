const environments = require('./environments');
const events = require('./events');

const package = require('../package.json');

module.exports = {
  app: package,
  environments,
  events,
  expiresSession: '3d',
  expiresIn: '3m',
  noUser: ' User doesnt exist',
  states: ['waiting', 'playing', 'finished', 'canceled'],
  decks: ['normal'],
  cards: ['number', 'draw', 'skip', 'reverse', 'wild'],
  colors: ['neutral', 'green', 'yellow', 'red', 'blue']
}
