const Rest = require('./rest');
const { environments } = require('../constants');
const { api } = environments;

module.exports = class Server extends Rest {
  constructor() {
    super(api, 'Api');
  }

  offline(id, attemp = 0) {
    return this.sendData(`auth/logout/${id}`, 'get').then(success => {
      console.log("SUCCESS", success)
    }).catch(err => {
      console.log("ERROR", err)
    });
  }
};
