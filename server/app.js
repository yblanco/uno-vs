const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const constants = require('./constants');
const logger = require('./libs/logger');

const routes = require('./routes');
const models = require('./models');


const app = express();

app.use((req, res, next) => {
  req.constants = constants;
  req.logger = logger;
  req.models = models.mongoose.models;
  res.response = (success, data) => res.json({ success, data });
  next();
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(morgan((tokens, req, res) => [
  tokens.method(req, res),
  `${req.hostname}${tokens.url(req, res)}`,
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'), '-',
  tokens['response-time'](req, res), 'ms',
].join(' '), { stream: logger.stream }));

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
