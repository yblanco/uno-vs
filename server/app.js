const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const requestIp = require('request-ip');

const constants = require('./constants');
const logger = require('./libs/logger');

const routes = require('./routes');
const models = require('./models');
const JWT = require('./libs/jwt');
const websocket = require('./libs/websocket');


const authMiddleware = require('./middlewares/auth.middleware');

const app = express();

-app.set('trust proxy', true)

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
  req.socket = websocket;
  res.response = (success, data) => res.json({ success, data });
  next();
});
app.use(requestIp.mw())
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', express.static(__dirname + '/public'));

app.use(morgan((tokens, req, res) => [
  req.clientIp,
  tokens.method(req, res),
  `${req.hostname}${tokens.url(req, res)}`,
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'), '-',
  tokens['response-time'](req, res), 'ms',
].join(' '), { stream: logger.stream }));

app.use(authMiddleware);

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
