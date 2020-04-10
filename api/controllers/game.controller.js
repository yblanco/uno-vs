module.exports = {
  new: async (req, res, next) => {
    let response = "Unknow Error";
    let success = false;
    try{
      const { body, models, socket, jwt, decode  } = req;
      const { players, id, bet, type } = decode;
      const { emitEvent, events } = socket;
      const { games } = models;
      await games.newGame(id, players, bet, type)
        .then(game => {
          const { code, state } = game;
          response = jwt.encodeRequest({ code, state });
          success = true;
        })
    } catch(err) {
      return next(err);
    }
    return res.response(success, response);
  },
  get: async (req, res, next) => {
    let response = "Unknow Error";
    let success = false;
    try{
      const { body, models, socket, jwt, decode  } = req;
      const { id } = decode;
      const { emitEvent, events } = socket;
      const { games } = models;
      await games.getCurrentInfo(id)
        .then(game => {
          response = jwt.encodeRequest(game);
          success = true;
        })
    } catch(err) {
      return next(err);
    }
    return res.response(success, response);
  },
  cancel: async (req, res, next) => {
    let response = "Unknow Error";
    let success = false;
    try{
      const { body, models, socket, jwt, decode  } = req;
      const { id } = decode;
      const { emitEvent, events } = socket;
      const { games } = models;
      await games.cancel(id)
        .then(game => {
          const { code } = game;
          response = jwt.encodeRequest({ code });
          success = true;
        })
    } catch(err) {
      return next(err);
    }
    return res.response(success, response);
  },
}
