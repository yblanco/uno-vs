import io from 'socket.io-client';
import { WEBSOCKET } from '../constants/env.constant';
import events from './events';

export const listener = io(WEBSOCKET);

export const connect = (event, cb) => {
  listener.on(event, cb);
};

export const disconnect = (event, cb) => {
  listener.off(event, cb);
};

export default events;
