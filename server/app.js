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
const JWT = require('./libs/jwt');

const authMiddleware = require('./middlewares/auth.middleware');

const app = express();

app.use((req, res, next) => {
  logger.debug("1")
  next()
})

app.use((req, res, next) => {
  const { environments = {} } = constants;
  const { secret_request:secret = false } = environments;
  if(secret === false) {
    throw new Error('Server not configured');
  }
  req.constants = constants;
  req.logger = logger;
  req.models = models.mongoose.models;
  req.jwt = new JWT(secret);
  res.response = (success, data) => res.json({ success, data });
  next();
});

app.use((req, res, next) => {
  logger.debug("2")
  next()
})

app.use(cors());
app.use((req, res, next) => {
  logger.debug("3")
  next()
})

app.use(bodyParser.json());
app.use((req, res, next) => {
  logger.debug("4")
  next()
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  logger.debug("5")
  next()
})

app.use(cookieParser());
app.use((req, res, next) => {
  logger.debug("6")
  next()
})

app.use('/', express.static(__dirname + '/public'));
app.use((req, res, next) => {
  logger.debug("7")
  next()
})

app.use(morgan((tokens, req, res) => [
  tokens.method(req, res),
  `${req.hostname}${tokens.url(req, res)}`,
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'), '-',
  tokens['response-time'](req, res), 'ms',
].join(' '), { stream: logger.stream }));

app.use((req, res, next) => {
  logger.debug("8")
  next()
})

app.use(authMiddleware);

app.use((req, res, next) => {
  logger.debug("9")
  next()
})

app.use('/', routes);

app.use((req, res, next) => {
  logger.debug("10")
  next()
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use((req, res, next) => {
  logger.debug("11")
  next()
})


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
