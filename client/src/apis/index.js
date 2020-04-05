import axios from 'axios';

export default class {
  constructor(host = '') {
    this.info = '';
    this.host = host;
    this.axios = axios.create({
      baseURL: host,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  call($route, method = 'get', data = {}) {
    const url = `${$route}`;
    let request;
    this.info = `Request to ${this.host}${url}`;
    switch (method) {
      case 'post':
        request = this.axios.post(url, data);
        break;
      case 'put':
        request = this.axios.post(url, data);
        break;
      default:
        request = this.axios.get(url);
    }
    return request
      .then(this.constructor.then.bind(this))
      .catch(this.constructor.catch.bind(this));
  }

  static catch(err) {
    const { message, response:res = {} } = err;
    const { data: response = {} } = res;
    const { data = {} } = response;
    const { message:error = undefined } = data;
    throw new Error(error || message);
  }

  static then(res) {
    const { data: result } = res;
    const { success, data } = result;
    if (!success) {
      throw new Error(data);
    }
    return data;
  }
}
