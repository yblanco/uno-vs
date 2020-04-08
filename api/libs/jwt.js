const jwt = require('jsonwebtoken');
const constants = require('../constants');
const { expires } = constants;

module.exports = class {
  constructor(secret) {
    this.secret = secret;
  }
  encode(data, expiresIn) {
    return jwt.sign(data, this.secret, { expiresIn });
  }
  encodeRequest(data) {
    return this.encode(data, '1m');
  }
  encodeUser(data) {
    return this.encode(data, expires);
  }
  decode(string) {
    return new Promise((resolve, reject) => {
      jwt.verify(string, this.secret, (err, decoded) => {
          if(err) {
            reject(err);
          } else {
            resolve(decoded)
          }
        });
    })
  }
}
