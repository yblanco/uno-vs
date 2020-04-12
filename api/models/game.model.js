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
  left: {
    type: [],
    required: true,
    default: [],
  },
  reward: {
    type: Number,
    required: true,
    default: 0,
  },
  winner: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

schema.statics.parseResult = (game) => {
  const { user, state, private = true, code = false, bet = 0, cant = 0, players = [], reward = 0, left=[], winner } = game || {};
  return { user, state, private, code, bet, cant, players, reward, left, winner };
}

schema.statics.queryGamesWaiting = (bet = 0) => ({ state: states[0], private: false, bet: { $lte: bet } });

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
  return this.findOne({ players: user, left: { $ne: user }, state: states.slice(0,2) })
    .then(this.getPlayers.bind(this));
}

schema.statics.getCurrent = function getCurrent(user) {
  return this.get(user).then(game => game.code);
}

schema.statics.getPlayers = function getPlayers(gameModel) {
  const game = this.parseResult(gameModel);
  return this.model('users').getMany(game.players)
    .then(players => ({ ...game, players }))
      .then(gameInfo => {
        const { winner = false } = gameInfo;
        if(winner === false) {
          return gameInfo;
        }
        return this.model('users').get(winner)
          .then(winnerInfo => ({ ...gameInfo, winner: winnerInfo }));
      });
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
      const { code = false } = game || {};
      if(code === false) {
        return this.add(id, false, cant, bet)
      }
      return this.joinGame(id, code, cant);
    })
}

schema.statics.newGame = function newGame (id, cant, bet, type) {
  return this.model('users').get(id)
    .then(({ id:idUser, money }) => this.hasGame(idUser)
      .then(hasGame => {
        const betPrice = Math.abs(bet);
        if(betPrice > money) {
          throw new Error('No enough money');
        }else if(hasGame) {
          return this.get(idUser);
        } else if(type === 'private') {
          return this.add(id, true, cant, betPrice)
        }
        return this.matchGame(idUser, betPrice, cant);
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

schema.statics.play = function play(code, reward) {
  return this.updateOne({ code }, { state: states[1], reward })
    .then(() => this.getByCode(code));
}

schema.statics.start = function start(id) {
  return this.get(id)
    .then(game => {
      const { user, code, players, bet } = game;
      if(user === id) {
        return this.model('users').invert(bet, players)
          .then((reward) => this.play(code, reward));
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
          const { cant, code, state } = game;
          if(code === false) {
            throw new Error('Game does not exist');
          } else if(state !== states[0]) {
            throw new Error(`Game is ${state}`)
          }
          return this.joinGame(id, code, cant);
        })
    });
}

schema.statics.games = function games(id, from, to) {
  return this.model('users').get(id)
    .then(({ money }) => (
      this.find(this.queryGamesWaiting(money)).skip(from).limit(to)
        .then((games) => games.map(this.parseResult))
          .then(all => this.countDocuments(this.queryGamesWaiting(money))
            .then(total => ({ all, total })))));
}

schema.statics.leftGame = function leftGame(code, id) {
  return this.updateOne({ code }, { $push: { left: id }})
    .then(() => code);
}

schema.statics.finishGame = function finishGame(code, id) {
  return this.updateOne({ code }, { state: states[2], winner: id })
    .then(() => this.getByCode(code)
      .then(game => this.model('users').reward(game.reward, id)
        .then(() => game)));
}

schema.statics.left = function left(id) {
  return this.get(id)
    .then(({ left, players, code }) => {
      console.log(code);
      const isPlayer = players.find(item => item.id === id) !== undefined;
      const hasLeft = left.find(item => item === id) !== undefined;
      if(isPlayer && !hasLeft) {
        return this.leftGame(code, id);
      } else{
        return this.getByCode(code);
      }
    }).then((code) => (this.getByCode(code)
        .then(game => {
          const { players, left } = game;
          const playerInGame = players.length - left.length;
          if(playerInGame > 1) {
            return game;
          }
          return this.finishGame(code, id);
        })));
}


module.exports = mongoose.model('games', schema);
