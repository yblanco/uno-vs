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
    .then(game => this.parseResult(game));
}

schema.statics.get = function get(user) {
  return this.findOne({ players: user, state: states.slice(0,2) })
    .then(game => this.parseResult(game));
}

schema.statics.getCurrent = function getCurrent(user) {
  return this.get(user).then(game => game.code);
}

schema.statics.getCurrentInfo = function getCurrentInfo(user) {
  return this.get(user)
    .then(game => this.model('users').getMany(game.players)
      .then(players => ({ ...game, players })));
}

schema.statics.newGame = function newGame (id, cant, bet, type) {
  return this.model('users').get(id)
    .then(user => this.hasGame(user.id)
      .then(hasGame => {
        if(hasGame) {
          return this.get(user.id);
        }
        return this.code()
          .then(code => this.create({
            user: user.id,
            private: type === 'private',
            players: [user.id],
            cant,
            bet,
            code,
          })).then(() => this.get(user.id))
      }))
}

schema.statics.cancelGame = function cancelGame(code) {
  return this.updateOne({ code }, { state: states[3] })
    .then(() => code);
}

schema.statics.removeUser = function removeUser(code, id) {
  return this.updateOne({ code }, { players: { $pull: id} })
    .then(() => code);
}


schema.statics.cancel = function cancel (id) {
  return this.model('users').get(id)
    .then(user => this.hasGame(user.id)
      .then(hasGame => this.get(user.id)
          .then(game => {
            const { code, user } = game;
            if(id === user) {
              return this.cancelGame(code);
            }
            return this.removeUser(code, id)
          }))).then((code) => (this.getByCode(code)));
}


module.exports = mongoose.model('games', schema);
