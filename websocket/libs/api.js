const Rest = require('./rest');
const logger = require('./logger');

const { environments } = require('../constants');
const { api } = environments;

module.exports = class Server extends Rest {
  constructor() {
    super(api, 'Api');
  }

  offline(id, attemp = 0) {
    return this.sendData(`auth/logout/${id}`, 'get').then(success => {
      logger.info(`Success on logout API ${success}`);
    }).catch(err => {
      logger.error('Logout on API', err);
    });
  }
};
