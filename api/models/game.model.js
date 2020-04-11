const mongoose = require('mongoose');
const { states } = require('../constants');
const { makeId } = require('../libs/utils');

const { Schema } = mongoose;

const schema = new Schema({
  user: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    index: true,
  },
  bet: {
    type: Number,
    required: true,
  },
  cant: {
    type: Number,
    required: true,
  },
  private: {
    type: Boolean,
    required: true,
  },
  state: {
    type: String,
    enum : states,
    default: states[0],
  },
  players: {
    type: [],
    required: true,
    index: true,
  },
  date: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

schema.statics.parseResult = (game) => {
  const { user, state, private = true, code = false, bet = 0, cant = 0, players = [] } = game || {};
  return { user, state, private, code, bet, cant, players };
}

schema.statics.code = function code() {
  const code = makeId(6);
  return this.findOne({ code })
    .then(game => game === null ? code : this.code())
}

schema.statics.hasGame = function hasGame (id) {
  return this.get(id)
    .then(game => game.code !== false)
}

schema.statics.getByCode = function getByCode(code) {
  return this.findOne({ code })
    .then(this.getPlayers.bind(this));
}

schema.statics.get = function get(user) {
  return this.findOne({ players: user, state: states.slice(0,2) })
    .then(this.getPlayers.bind(this));
}

schema.statics.getCurrent = function getCurrent(user) {
  return this.get(user).then(game => game.code);
}

schema.statics.getPlayers = function getPlayers(gameModel) {
  const game = this.parseResult(gameModel);
  return this.model('users').getMany(game.players)
    .then(players => ({ ...game, players }));
}

schema.statics.add = function add(user, isPrivate, cant, bet) {
  return this.code()
    .then(code => this.create({
      user,
      private: isPrivate,
      players: [user],
      cant,
      bet,
      code,
    })).then(() => this.get(user))
}

schema.statics.joinGame = function joinGame(user, code, cant) {
  const playersMax = `players.${cant - 1}`;
  return this.updateOne({ code, [playersMax]: { $exists: false } }, { $push: { players: user } })
    .then((update) => {
      const { n } = update;
      if(n === 0) {
        throw new Error('Game is full');
      }
      return code;
    }).then(() => this.get(user));
}

schema.statics.matchGame = function matchGame(id, bet, cant) {
  const playersMax = `players.${cant - 1}`;
  return this.findOne({
    bet,
    cant,
    private: false,
    state: states[0],
    [playersMax]: { $exists: false },
  })
    .then(game => {
      const { code = false, cant } = game || {};
      if(code === false) {
        return this.add(id, false, cant, bet)
      }
      return this.joinGame(id, code, cant);
    })
}

schema.statics.newGame = function newGame (id, cant, bet, type) {
  return this.model('users').get(id)
    .then(({ id:idUser }) => this.hasGame(idUser)
      .then(hasGame => {
        if(hasGame) {
          return this.get(idUser);
        } else if(type === 'private') {
          return this.add(id, true, cant, bet)
        }
        return this.matchGame(idUser, bet, cant);
      }))
}

schema.statics.cancelGame = function cancelGame(code) {
  return this.updateOne({ code }, { state: states[3] })
    .then(() => code);
}

schema.statics.removeUser = function removeUser(code, id) {
  return this.updateOne({ code }, { $pull: { players: id } })
    .then(() => code);
}

schema.statics.changeAdmin = function changeAdmin(players, code) {
  const [admin] = players;
  const { id } = admin;
  return this.updateOne({ code }, { user: id })
    .then(() => code);
}

schema.statics.cancel = function cancel (id) {
  return this.model('users').get(id)
    .then(({ id: idUser}) => this.hasGame(idUser)
      .then(hasGame => this.get(idUser)
        .then(({ code }) => this.removeUser(code, idUser))
          .then((code) => this.getByCode(code)
            .then(game => {
              const { players, user } = game;
              if(players.length === 0) {
                return this.cancelGame(code);
              } else if(user === id) {
                return this.changeAdmin(players, code)
              }
              return code;
            })).then((code) => (this.getByCode(code)))));
}

schema.statics.play = function play(code) {
  return this.updateOne({ code }, { state: states[1] })
    .then(() => this.getByCode(code));
}

schema.statics.start = function start(id) {
  return this.get(id)
    .then(game => {
      const { user, code } = game;
      if(user === id) {
        return this.play(code)
      }
      return game;
    })
}

schema.statics.join = function join(id, code) {
  return this.get(id)
    .then(hasGame => {
      const { code:hasCode } = hasGame;
      if(hasCode !== false) {
        return hasGame;
      }
      return this.getByCode(code)
        .then(game => {
          const { cant, code } = game;
          if(code === false) {
            throw new Error('Game does not exist');
          }
          return this.joinGame(id, code, cant);
        })
    });
}


module.exports = mongoose.model('games', schema);
