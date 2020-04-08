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
      const { models, jwt, decode, clientIp, socket } = req;
      const { emitEvent, events } = socket;
      const { users } = models;
      const { name, email, picture, id, from } = decode;
      await users.sign(name, email, picture, id, from, clientIp)
        .then(user => (emitEvent(events.on_connect, user.id)
          .then(() => {
            response = jwt.encodeUser(user);
            success = true;
          })));
    } catch(err) {
      return next(err);
    }
    return res.response(success, response);
  },
  check: async (req, res, next) => {
    let response = "Unknow Error";
    let success = false;
    try{
      const {  body, models, jwt, decode, socket } = req;
      const { emitEvent, events } = socket;
      const { users } = models;
      const { id } = decode;
      await users.check(id)
        .then(user => emitEvent(events.on_connect, user.id)
          .then(() => {
            response = jwt.encodeUser(user);
            success = true;
          }));
    } catch(err) {
      return next(err);
    }
    return res.response(success, response);
  },
  logout: async (req, res, next) => {
    let response = "Unknow Error";
    let success = false;
    try{
      const {  body, models, jwt, decode, socket } = req;
      const { emitEvent, events } = socket;
      const { users } = models;
      const { id } = decode;
      await users.logout(id)
        .then(user => {
          return emitEvent(events.on_disconnect, user.id)
          .then(() => {
            response = jwt.encodeUser(user);
            success = true;
          })});
    } catch(err) {
      return next(err);
    }
    return res.response(success, response);
  },
}
