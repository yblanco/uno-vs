import axios from 'axios';
import jwt from 'jsonwebtoken';

import { SERVER, SECRET_REQUEST } from '../constants/env.constant';

export default class {
  constructor(path = '') {
    this.info = '';
    this.host = `${SERVER}/${path}`;
    this.axios = axios.create({
      baseURL: this.host,
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

  responseAuth($route, method = 'get', info = {}) {
    return this.call($route, method, { info })
      .then(response => new Promise((resolve, reject) => {
        jwt.verify(response, SECRET_REQUEST, (err, decoded) => {
          if(err) {
            reject(err);
          } else {
            resolve({ ...decoded, encoded: response})
          }
        });
      }));
  }

  requestAuth($route, method = 'get', data = {}) {
    return this.responseAuth($route, method,  jwt.sign(data, SECRET_REQUEST, { expiresIn: '3m' }));
  }
}
