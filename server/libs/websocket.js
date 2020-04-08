const Rest = require('./rest');
const { environments } = require('../constants');
const { websocket } = environments;

class Websocket extends Rest {
  constructor(events) {
    super(websocket, 'Websocket');
    this.events = events;
  }

  event(event, data) {
    const title = '[EVENT DISPATCH]';
    this.dataSend = { event, data };
    return this.sendData('socket', 'post')
      .then((result) => {
        this.logger.info(`${title} Dispatch ${event}: ${result}`);
      })
      .catch((err) => {
        this.logger.error(`${title} Error ${event}: ${err.message}`);
      });
  }
};

const events = {
  on_connect: 'on_connect',
  on_disconnect: 'on_disconnect',
};

const emitEvent = (event, data) => {
  return new Websocket(events).event(event, data);
};

module.exports = { emitEvent, events };
