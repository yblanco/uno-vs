const { parsed } = require('dotenv').config();

module.exports = {
  debug: parsed.DEBUG === 'true',
  env: process.env.NODE_ENV || 'local',
  path_log: process.env.PATH_LOG || '/var/log',
  max_day_log: parseInt(process.env.DAY_LOG, 10) || 3,
  secret_request: process.env.SECRET_REQUEST ||  'mysecret',
  facebook_app_id: process.env.FACEBOOK_APP_ID,
  google_app_id: process.env.GOOGLE_APP_ID,
  websocket: process.env.WEBSOCKET_SERVER || 'websocket',
  db: {
    host: process.env.DBHOST || 'localhost',
    port: process.env.DBPORT || '27017',
    user: process.env.DBUSER,
    pass: process.env.DBPASS,
  },
  user_limit: parseInt(process.env.USER_LIMIT || 25, 10),
  maxPlayers: parseInt(process.env.MAX_PLAYER || 4, 10),
  minBet: parseInt(process.env.MIN_BET || 250, 10),
}
