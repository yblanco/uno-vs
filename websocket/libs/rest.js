const axios = require('axios');
const { environments } = require('../constants');
const logger = require('./logger.js');

const { timeout } = environments;

module.exports = class {
  constructor(host, name, check = '') {
    this.host = this.constructor.getHost(host);
    this.name = name;
    this.checkRoute = check;
    this.logger = logger;
    this.instance = axios.create({
      baseURL: this.host,
      headers: { 'Content-Type': 'application/json' },
      timeout,
    });
    this.dataSend = {};
  }

  static getHost(host) {
    let hostParse = host.trim().split(' ').join('');
    if (hostParse.indexOf('https://') !== 0 && hostParse.indexOf('http://') !== 0) {
      hostParse = `http://${hostParse}`;
    }
    if (hostParse.substr(-1) !== '/') {
      hostParse = `${hostParse}/`;
    }
    return hostParse;
  }


  check() {
    return this.sendData(this.checkRoute, 'get')
      .then(() => (true))
      .catch((err) => {
        this.logger.error('REST 1', new Error(`Unable to connect to ${this.name}: ${err.message}`));
        return false;
      });
  }

  sendData($route, method = 'post') {
    this.logger.info(`> Connecting to ${this.name}:`);
    this.logger.info(`>> [${method.toUpperCase()}] ${this.host}${$route} `);
    this.logger.info(`>>> ${JSON.stringify(this.dataSend)}`);

    switch (method) {
      case 'get':
        return this.instance.get($route)
          .then(this.sendDataThen.bind(this))
          .catch(this.constructor.sendDataCatch.bind(this));
      case 'put':
        return this.instance.put($route, this.dataSend)
          .then(this.sendDataThen.bind(this))
          .catch(this.constructor.sendDataCatch.bind(this));
      default:
        return this.instance.post($route, this.dataSend)
          .then(this.sendDataThen.bind(this))
          .catch(this.constructor.sendDataCatch.bind(this));
    }
  }

  sendDataThen(response) {
    const { data: result, status } = this.constructor.dataResponse(response);
    const { data, success } = result;
    if (status !== 200 || !success) {
      throw new Error(data);
    }
    return data;
  }

  static sendDataCatch(err) {
    const { message, response: res = {}, errno } = err;
    const { data: response = {} } = res;
    const { data = {} } = response;
    const { message: error = undefined } = data;
    if (errno === 'ECONNREFUSED') {
      throw new Error(`${this.name} unavailable`);
    }
    throw new Error(`Error on Reqest to ${this.name}: ${error || message}`);
  }

  static dataResponse(result) {
    const { data, status } = result;
    return { status, data };
  }
};
