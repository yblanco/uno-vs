const mongoose = require('mongoose');
const logger = require('../libs/logger');
const { environments } = require('../constants');

const { env, db, debug } = environments;
const { host, port, name, user = false, pass = false } = db;

class MongoDatabase {
  constructor() {
    this.env = env;
    this.mongoose = mongoose;
    this.db = name;
    this.dbURI = `mongodb://${host}:${port}/${this.db}`;
    this.reconnectInterval = 1500;
    this.mongoose.set('debug', debug);
    this.mongoose.Promise = global.Promise;
    this.instance = false;
    this.retry = 0;
    this.dbOption = {
      useNewUrlParser: true,
      useCreateIndex: true,
      poolSize: 10,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };
    if(user !== false && pass !== false) {
      this.dbOption.auth = { authSource: 'admin' };
      this.dbOption.user = user;
      this.dbOption.pass = pass;
    }
    this.events(this);
  }

  events() {
    this.mongoose.connection.on('error', (err) => {
      logger.error(`Error connecting ${this.retry} to MongoDb @ ${this.dbURI}: ${err.message}`);
      this.mongoose.disconnect();
    });
    this.mongoose.connection.on('connecting', () => {
      logger.info(`Connecting to MongoDB @ ${this.dbURI}`);
    });
    this.mongoose.connection.on('connected', () => {
      logger.info(`Successfully connected to MongoDB @ ${this.dbURI} `);
      this.instance = true;
    });
    this.mongoose.connection.on('reconnected', () => {
      logger.info(`Reconnected to MongoDB @ ${this.dbURI}`);
    });
    this.mongoose.connection.on('disconnected', () => {
      logger.info(`Disconnected from MongoDB @ ${this.dbURI}`);
    });
  }

  connect() {
    if (this.instance === false) {
      this.retry += 1;
      this.mongoose.connect(this.dbURI, this.dbOption)
        .catch((err) => {
          logger.error(`Error on start mongo connection: ${err.message}`);
          this.instance = false;
          this.timeout = setTimeout(this.connect.bind(this), this.reconnectInterval);
        });
    } else {
      logger.info(`Already connected to MongoDB @ ${this.dbURI}`);
    }
    return true;
  }
}

module.exports = new MongoDatabase();
