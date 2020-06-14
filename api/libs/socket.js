const socketClient = require('socket.io-client');

const logger = require('./logger');

const { environments, events } = require('../constants');
const { websocket } = environments;

const urlSocket = (!/^(?:f|ht)tps?\:\/\//.test(websocket)) ? `http://${websocket}` : websocket;

const socket = socketClient(urlSocket);

socket.on('connect', () => {
  logger.info(`Connect to socket ${websocket}`);
});
socket.on('disconnect', () => {
  logger.info(`Disconnect from socket ${websocket}`);
});
socket.on('connect_error', (err) => {
  logger.error('CONNECT SOCKET', err);
});

const emitEvent = (event, data) => {
  return new Promise((resolve, reject) => {
    try {
      socket.emit('emit-event', { event, data });
      resolve(true);
    } catch (err) {
      logger.error('EMIT EVENT', err);
    }
  })
}

module.exports = { emitEvent, events, io: socket };
