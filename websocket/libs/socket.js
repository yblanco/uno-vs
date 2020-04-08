const socketIo = require('socket.io');
const logger = require('./logger');
const Api = require('./api');

const io = socketIo();
const socket = {};

io.on('connection', (connect) => {
  const { id, handshake = {} } = connect;
  const { address = {}, headers = {}  } = handshake;
  const { origin } = headers;
  logger.notice(`Connected ${id} from ${address} [Referer: ${origin}]`);
  connect.on('disconnect', () => {
    const api = new Api();
    logger.notice(`Disconnected ${id} from ${address} [Referer: ${origin}]`);
    api.offline(id);
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
