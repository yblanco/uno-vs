export const SERVER_PROTOCOL = process.env.REACT_APP_HOST_PROTOCOL || 'http';
export const SERVER_HOST = process.env.REACT_APP_HOST_SERVER || 'localhost';
export const SERVER_PORT = process.env.REACT_APP_PORT_SERVER || '3001';

export const SERVER = `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}`;

export const SECRET_REQUEST = 'mysecret';

export const KEY_STORAGE = 'logged';
