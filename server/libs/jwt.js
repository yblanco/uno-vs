const jwt = require('jsonwebtoken');
module.exports = class {
  constructor(secret) {
    this.secret = secret;
  }
  encode(data, expiresIn = '1m') {
    return jwt.sign(data, this.secret, { expiresIn });
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
