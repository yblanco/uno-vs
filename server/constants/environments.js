const { parsed } = require('dotenv').config();

module.exports = {
  debug: parsed.DEBUG === 'true',
  env: process.env.NODE_ENV || 'local',
  path_log: process.env.PATH_LOG || '/var/log',
  max_day_log: parseInt(process.env.DAY_LOG, 10) || 3,
  secret_request: process.env.SECRET_REQUEST ||  'mysecret',
  facebook_app_id: process.env.FACEBOOK_APP_ID || '252935095840870',
  db: {
    host: process.env.DBHOST || 'localhost',
    port: process.env.DBPORT || '27017',
    user: process.env.DBUSER,
    pass: process.env.DBPASS,
  },
}
