import jwt from 'jsonwebtoken';
import Rest from './index';
import { SERVER, SECRET_REQUEST } from '../constants/env.constant';

class AuthRest extends Rest {
  responseAuth($route, method = 'get', data = {}) {
    return this.call($route, method, data)
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
    const body = {
      info: jwt.sign(data, SECRET_REQUEST, { expiresIn: '3m' }),
    };
    return this.responseAuth($route, method, body);
  }

  getAppId() {
    return this.responseAuth('app_id');
  }

  auth(user) {
    return this.requestAuth('sign', 'post', user)
  }

  checkUser(logged) {
    return this.responseAuth('check', 'post', { logged })
  }
}

export default new AuthRest(`${SERVER}/auth`);
//
