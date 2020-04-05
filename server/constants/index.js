const environments = require('./environments');
const package = require('../package.json');

module.exports = {
  app: package,
  environments,
  expires: '3d',
}
