const environments = require('./environments');
const events = require('./events');

const package = require('../package.json');

module.exports = {
  app: package,
  environments,
  events,
  expires: '3d',
  noUser: ' User doesnt exist',
}
