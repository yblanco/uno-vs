module.exports = {
  new: async (req, res, next) => {
    let response = "Unknow Error";
    let success = false;
    try{
      const { body, models, socket, jwt, decode  } = req;
      const { players, id, bet, type } = decode;
      const { emitEvent, events } = socket;
      const { games } = models;
      const code_event = `${events.set_code}_${id}`;
      await games.newGame(id, players, bet, type)
        .then((game) => (emitEvent(code_event, game))
          .then(() => emitEvent(game.code, game)
            .then(() => {
              response = jwt.encodeRequest(game);
              success = true;
            })));
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
      await games.get(id)
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
      const code_event = `${events.set_code}_${id}`
      await games.cancel(id)
        .then((game)  => (emitEvent(code_event, { code: false }))
          .then(() => emitEvent(game.code, game)
            .then(() => {
              response = jwt.encodeRequest(game);
              success = true;
            })));
    } catch(err) {
      return next(err);
    }
    return res.response(success, response);
  },
}
