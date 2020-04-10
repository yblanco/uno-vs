const jwt = require('jsonwebtoken');
const constants = require('../constants');
const { expiresSession, expiresIn } = constants;

module.exports = class {
  constructor(secret) {
    this.secret = secret;
  }
  encode(data, expiresIn) {
    return jwt.sign(data, this.secret, { expiresIn });
  }
  encodeRequest(data) {
    return this.encode(data, expiresIn);
  }
  encodeUser(data) {
    return this.encode(data, expiresSession);
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
