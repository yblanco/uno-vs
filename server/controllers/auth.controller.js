module.exports = {
  app_id: (req, res, next) => {
    let response = "Unknow Error";
    let success = false;
    try{
      const { constants = {}, jwt } = req;
      const { environments = {} } = constants;
      const { facebook_app_id:facebook = false, google_app_id:google = false } = environments;
      if(facebook === false) {
        throw new Error('Facebook configuration is missing');
      } else if(google === false) {
        throw new Error('Google configuration is missing');
      }
      response = jwt.encodeRequest({ google, facebook });
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
      const { models, jwt, decode, clientIp } = req;
      const { name, email, picture, id, from } = decode;
      await models.users.sign(name, email, picture, id, from, clientIp)
        .then(user => {
          response = jwt.encodeUser(user);
          success = true;
        });
    } catch(err) {
      return next(err);
    }
    return res.response(success, response);
  },
  check: async (req, res, next) => {
    let response = "Unknow Error";
    let success = false;
    try{
      const {  body, models, jwt, decode  } = req;
      const { id } = decode;
      await models.users.get(id)
        .then(user => {
          response = jwt.encodeUser(user);
          success = true;
        });
    } catch(err) {
      return next(err);
    }
    return res.response(success, response);
  },
}
