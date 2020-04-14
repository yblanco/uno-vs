module.exports = {
  new: async (req, res, next) => {
    let response = "Unknow Error";
    let success = false;
    try{
      const { models, socket, jwt, decode  } = req;
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
      const { models, socket, jwt, decode  } = req;
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
      const { models, socket, jwt, decode  } = req;
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
  start: async (req, res, next) => {
    let response = "Unknow Error";
    let success = false;
    try{
      const { models, socket, jwt, decode  } = req;
      const { id } = decode;
      const { emitEvent, events } = socket;
      const { games, users } = models;
      await games.start(id)
        .then((game) => emitEvent(game.code, game)
          .then(() => users.getMany(game.players.map(player => player.id))
            .then((users) => Promise.all(users.map(user => emitEvent(user.id, user)))
              .then(() => {
                response = jwt.encodeRequest(game);
                success = true;
              }))));
    } catch(err) {
      return next(err);
    }
    return res.response(success, response);
  },
  join: async (req, res, next) => {
    let response = "Unknow Error";
    let success = false;
    try{
      const { models, socket, jwt, decode  } = req;
      const { id, code } = decode;
      const { emitEvent, events } = socket;
      const { games } = models;
      const code_event = `${events.set_code}_${id}`;
      await games.join(id, code.toUpperCase())
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
  games: async (req, res, next) => {
    let response = "Unknow Error";
    let success = false;
    try{
      const { models, jwt, decode  } = req;
      const { id, from = 0, to = 10 } = decode;
      const { games } = models;
      await games.games(id, from, to)
        .then((records) =>  {
            response = jwt.encodeRequest(records);
            success = true;
          });
    } catch(err) {
      return next(err);
    }
    return res.response(success, response);
  },
  left: async (req, res, next) => {
    let response = "Unknow Error";
    let success = false;
    try{
      const { models, jwt, decode, socket } = req;
      const { id } = decode;
      const { emitEvent, events } = socket;
      const { games, users } = models;
      const code_event = `${events.set_code}_${id}`;
      await games.left(id)
        .then((game)  => (emitEvent(code_event, { code: false }))
          .then(() => emitEvent(game.code, game)
            .then(() => {
              const { winner = false } = game;
              if(winner !== false) {
                return users.get(winner.id)
                  .then(user => (emitEvent(user.id, user)
                    .then(() => game)));
              }
              return game;
            })))
              .then(game => {
                console.log("========================")
                console.log(game)
                console.log("*")
                response = jwt.encodeRequest(game);
                success = true;
              });
    } catch(err) {
      return next(err);
    }
    return res.response(success, response);
  },
}
