const JWT = require('../libs/jwt');

module.exports = {
  app_id: (req, res, next) => {
    let response = "Unknow Error";
    let success = false;
    try{
      const { constants = {} } = req;
      const { environments = {} } = constants;
      const { secret_request:secret = false, facebook_app_id:id = false } = environments;
      const jwt = new JWT(secret);
      if(secret === false || id === false) {
        throw new Error('Server not configured');
      }
      response = jwt.encode({ id });
      success = true;
    } catch(err) {
      return next(err);
    }
    return res.response(success, response);
  },
  sign: async (req, res, next) => {
    let response = "Unknow Error";
    let success = false;
    try{
      const { constants = {}, body, models } = req;
      const { info } = body;
      const { environments = {}, expires } = constants;
      const { secret_request:secret = false  } = environments;
      const jwt = new JWT(secret);
      await jwt.decode(info)
        .then(data => {
          const { name, email, picture, id } = data;
          const { url = false } = picture.data;
          return models.users.sign(name, email, url, id)
            .then(user => {
              response = jwt.encode(user, expires);
              success = true;
            });
        })
    } catch(err) {
      return next(err);
    }
    return res.response(success, response);
  },
  check: async (req, res, next) => {
    let response = "Unknow Error";
    let success = false;
    try{
      const { constants = {}, body, models } = req;
      const { logged } = body;
      const { environments = {}, expires } = constants;
      const { secret_request:secret = false  } = environments;
      const jwt = new JWT(secret);
      await jwt.decode(logged)
        .then(data => {
          const { mail } = data;
          return models.users.get(mail)
            .then(user => {
              response = jwt.encode(user, expires);
              success = true;
            });
        })
    } catch(err) {
      return next(err);
    }
    return res.response(success, response);
  },
}
