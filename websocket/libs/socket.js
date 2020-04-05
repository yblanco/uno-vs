const socketIo = require('socket.io');
const logger = require('./logger');

const io = socketIo();
const socket = {};

io.on('connection', (connect) => {
  const address = connect.handshake;
  logger.notice(`Connected from ${address.address}} [Referer: ${address.headers.origin}]`);
  connect.on('disconnect', () => {
    logger.notice(`Disconnected from ${address.address}} [Referer: ${address.headers.origin}]`);
  });
});

socket.event = (event, data) => new Promise((resolve, reject) => {
  try {
    logger.debug(`Event '${event}': ${JSON.stringify(data)}`);
    io.sockets.emit(event, data);
    resolve(true);
  } catch (err) {
    reject(err);
  }
});

socket.io = io;

module.exports = socket;
