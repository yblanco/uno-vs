const socketIo = require('socket.io');
const logger = require('./logger');
const Api = require('./api');

const api = new Api();
const io = socketIo();

io.on('connection', (socket) => {
  const { id, handshake = {} } = socket;
  const { address = {}, headers = {}  } = handshake;
  const { origin = 'unknown' } = headers;

  logger.notice(`Connected ${id} from ${address} [Referer: ${origin}]`);

  socket.on('emit-event', (message) => {
    const { event, data } = message;
    logger.info(`Received and broadcast result call for event ${event} with data: ${JSON.stringify(data)}`);
    io.sockets.emit(event, data);
  });

  socket.on('disconnect', () => {
    logger.notice(`Disconnected ${id} from ${address} [Referer: ${origin}]`);
    io.sockets.emit('user_disconnect', id);
  });
});

module.exports = io;
