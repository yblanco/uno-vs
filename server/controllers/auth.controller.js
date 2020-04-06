module.exports = {
  app_id: (req, res, next) => {
    let response = "Unknow Error";
    let success = false;
    try{
      const { constants = {}, jwt } = req;
      const { environments = {} } = constants;
      const { facebook_app_id:id = false } = environments;
      if(id === false) {
        throw new Error('Facebook configuration is missing');
      }
      response = jwt.encodeRequest({ id });
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
      const { models, jwt, decode } = req;
      const { name, email, picture = {}, id, status = false } = decode;
      const { url = false } = picture.data || {};
      if(status != false) {
        throw new Error('Unathorized from facebook')
      }
      await models.users.sign(name, email, url, id)
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
      const { mail } = decode;
      await models.users.get(mail)
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
