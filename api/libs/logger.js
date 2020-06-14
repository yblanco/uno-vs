const path = require('path');
const fs = require('fs');
const { createLogger, format, transports } = require('winston');

const { environments, app } = require('../constants');
const { max_day_log:maxday, path_log:pathFolder, env, debug } = environments;

require('winston-daily-rotate-file');

class Logger {
  constructor(route, name, envName, max) {
    const folder = path.join(route);
    const levelsLog = ['error', 'info', 'debug', 'warn'];

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
    this.name = name.toLowerCase();
    this.env = envName.toLowerCase();
    this.log_data = null;
    this.route = folder;
    this.max_file = max;
    this.logger = createLogger({
      transports: [
        new transports.Console({ level: 'silly' }),
        ...levelsLog.map((level) => this.rotateLog(level)),
      ],
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(this.loggerFormat.bind(this)),
      ),
    });
    this.stream = { write: this.write.bind(this) };
  }

  async write(message) {
    this.notice(message);
  }

  loggerFormat(log) {
    const { timestamp, message, level } = log;
    return `${timestamp} ${level.toUpperCase()} @ ${this.name} ${this.env} -> ${message}`;
  }

  rotateLog (level) {
    return new transports.DailyRotateFile({
      level,
      filename: path.join(this.route, '%DATE%', `${level}.log`),
      datePattern: 'YYYY-MM-DD',
      maxFiles: `${this.max_file}d`,
    });
  }

  async error(error = 'Not Defined', err = new Error('Unknown error')) {
    this.logger.log('error', `${error} - ${err.message}`);
    if (debug) {
      this.debug(err.stack);
    }
  }

  async warning(message) {
    this.logger.log('warn', message);
  }

  async notice(message) {
    this.logger.log('verbose', message);
  }

  async info(message) {
    this.logger.log('info', message);
  }

  async debug(message) {
    this.logger.log('debug', message);
  }
}

module.exports = new Logger(pathFolder, app.name, env, maxday);
