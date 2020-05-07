const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');


const constants = require('./constants');
const logger = require('./libs/logger');
const socket = require('./libs/socket');

const routes = require('./routes');

const app = express();

app.set('trust proxy', true)

app.use((req, res, next) => {
  req.constants = constants;
  req.logger = logger;
  res.response = (success, data) => res.json({ success, data });
  req.socket = socket.event;
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '1024mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', express.static(__dirname + '/public'));

app.use(morgan((tokens, req, res) => [
  tokens.method(req, res),
  `${req.hostname}${tokens.url(req, res)}`,
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'), '-',
  tokens['response-time'](req, res), 'ms',
].join(' '), { stream: logger.stream }));

app.io = socket.io;

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const data = {
    message: err.message,
    error: req.constants.environments.debug ? err.stack : err.toString(),
  };
  const error = err.status || 500
  res.status(error);
  req.logger.error(error, err.toString())
  res.response(false, data);
});

module.exports = app;
