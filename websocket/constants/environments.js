const { parsed } = require('dotenv').config();

module.exports = {
  debug: parsed.DEBUG === 'true',
  path_log: parsed.PATH_LOG || '/var/log',
  max_day_log: parseInt(parsed.DAY_LOG, 10) || 3,
  env: process.env.NODE_ENV || 'local',
  api: process.env.SERVER || 'api',
  timeout: parseInt(process.env.TIMEOUT || 5000, 10),
}
