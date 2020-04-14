const mongoose = require('mongoose');
const { noUser } = require('../constants');

const { Schema } = mongoose;

const friends = new Schema({
  id:  {
    type: String,
    required: true,
    index: true,
  },
  date: {
    type: Date,
    require: true,
    default: Date.now,
  },
})

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
    default: 'no_mail',
  },
  picture: {
    type: String,
    required: true,
  },
  id:  {
    type: String,
    required: true,
    index: true,
  },
  ip: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    default: 1,
  },
  money: {
    type: Number,
    required: true,
    default: 1000,
  },
  diamonds: {
    type: Number,
    required: true,
    default: 10,
  },
  tutorial: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Date,
    require: true,
    default: Date.now,
  },
  online: {
    type: Boolean,
    required: true,
    default: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  friends_confirmed: {
    type: [friends],
    required: true,
    default: [],
  },
  friends_blocked: {
    type: [friends],
    required: true,
    default: [],
  },
  friends_request: {
    type: [friends],
    required: true,
    default: [],
  },
  requested_friends: {
    type: [friends],
    required: true,
    default: [],
  }
});

schema.statics.queryUserStatus = () => ({ status: true,});

schema.statics.queryUser = function queryUser(id) {
  const query = this.queryUserStatus();
  return { ...query, id };
}

schema.statics.queryRank = () => ({
  rank: {
    $multiply: [
      '$level',
      { $sum: [{$multiply: ['$money', 4]}, { $multiply: [2, '$diamonds']}] }
    ]
  }
});

schema.statics.parseResult = (user) => {
  const {
    level,
    tutorial,
    name,
    mail,
    picture,
    id,
    money,
    diamonds,
    rank,
    position,
    online,
    friends_confirmed=[],
    friends_request=[],
    requested_friends=[],
    friends_blocked=[],
  } = user || {};
  return {
    level,
    tutorial,
    name,
    mail,
    picture,
    id,
    money,
    diamonds,
    rank,
    position,
    online,
    friends_confirmed,
    friends_request,
    requested_friends,
    friends_blocked,
   };
}

schema.statics.add = function add(name, mail, picture, id, from, ip) {
  const data = {
    name, mail, picture, id, ip, from
  };
  return this.create(data)
    .then(user => this.get(user.id));
};

schema.statics.getAllFriends = (user) => {
  const { friends_confirmed, friends_request, requested_friends, friends_blocked } = user;
  return friends_confirmed.concat(friends_request).concat(requested_friends).concat(friends_blocked)
    .map(friend => friend.id);
}

schema.statics.get = function get(id) {
  return this.findOne(this.queryUser(id))
    .then((user) => {
      const response = this.parseResult(user);
      const allfriends = this.getAllFriends(response);
      if (user === null) {
        throw new Error(noUser);
      }
      return this.model('games').getCurrent(user.id)
        .then(code => this.getMany(allfriends)
          .then(friends => ({ ...response, code, friends })));
      });
}

schema.statics.getMany = function getMany(ids) {
  return this.find(this.queryUser(ids))
    .then(users => users.map(this.parseResult));
}

schema.statics.getManyWithFriends = function getManyWithFriends(ids) {
  return this.getMany(ids)
    .then(users => (Promise.all(users.map(user => (
      this.getMany(this.getAllFriends(user)).then(friends => ({ ...user, friends}))))
    )))
}


schema.statics.updateUser = function udpateUser(id, online = null, picture = null) {
  const data = {};
  if(online !== null) {
    data.online = online;
  }
  if(picture !== null) {
    data.picture = picture;
  }
  return this.updateOne({ id }, data)
    .then(() => (this.get(id)));
}

schema.statics.on = function on(id, ip, socket, picture = null) {
  return this.updateUser(id, true, picture)
    .then((userLogIn) => this.model('logs').logIn(userLogIn.id, ip, socket)
      .then(() => userLogIn));
}

schema.statics.sign = function sign(name, email, picture, appId, from, ip, socket) {
  const id = `${from}_${appId}_${name.replace(/[^a-z0-9_]/gi, '').split(' ').join('-')}`;
  return this.get(id)
    .catch(err => {
      const { message } = err;
      if(message === noUser) {
        return this.add(name, email, picture, id, from, ip);
      }
      throw err;
    })
      .then(user => this.on(user.id, ip, socket, picture));
}

schema.statics.check = function check(id, ip, socket) {
  return this.get(id)
    .then(user => this.on(user.id, ip, socket));
}

schema.statics.logout = function logout(socket) {
  return this.model('logs').logOut(socket)
    .then(userState => {
      const { id, online } = userState;
      return this.updateUser(id, online)
        .then(() => userState)
        .catch(err => {
          if(err.message === noUser){
            return userState
          }
          throw err;
        });
    });
}

schema.statics.countUser = function countUser() {
  return this.countDocuments(this.queryUserStatus());
}

schema.statics.rank = function rank(limit) {
  return this.aggregate([
    { $match: this.queryUserStatus()},
    { $addFields: this.queryRank() },
    { $sort: { rank: -1, date: 1 } },
    { $limit: limit }
  ])
  .then(ranks => (ranks.map(this.parseResult)))
}

schema.statics.friendsRank = function rank(limit, id) {
  return this.get(id)
    .then(user => {
      const { friends_confirmed:friends = [] } = user;
      return this.aggregate([
        { $match: { ...this.queryUserStatus(), id: { $in: friends.map(({ id:friend }) => friend).concat(id) } }},
        { $addFields: this.queryRank() },
        { $sort: { rank: -1, date: 1 } },
        { $limit: limit }
      ])
      .then(ranks => (ranks.map(this.parseResult)))
    });
}

schema.statics.userRank = function rank(id) {
  return this.aggregate([
    { $match: this.queryUser(id)},
    { $addFields: this.queryRank() },
  ]).then(userRank => userRank.pop() || {})
    .then(rank => this.getRank(rank));
}

schema.statics.getRank = function getRank(rank) {
  return this.aggregate([
    { $match: this.queryUserStatus()},
    { $addFields: this.queryRank() },
    { $match: { rank: { $gt: rank }} },
    { $count: "ranks" },
    { $project: { position: {$sum: ['$ranks', 1]} } }
  ]).then(userRank => {
    const ranked = userRank.pop() || {};
    const { position = false } = ranked;
    if(position === false) {
      return this.countUser();
    }
    return position;
  })
}

schema.statics.invert = function invert(bet, players) {
  return this.updateMany({ id: players.map(({ id }) => id)}, { $inc: { money: bet*-1 }})
    .then(({ n }) => n*bet);
}

schema.statics.reward = function reward(reward, player) {
  return this.updateOne({ id: player }, { $inc: { money: reward }});
}

schema.statics.search = function search(id, name) {
  return this.find({
    id: { $ne: id },
    name: RegExp(name, ['i']),
    "friends_confirmed.id": { $ne: id },
    "friends_blocked.id": { $ne: id },
  })
}

schema.statics.getMeAndThey = (users, me, they) => ({
  me: users.find(item => item.id === me),
  they: users.find(item => item.id === they)
})

schema.statics.sendRequest = function sendRequest(user, friend) {
  return this.updateOne({ id: user }, { $push: { requested_friends: { id: friend} }})
    .then(() => this.updateOne({ id: friend }, { $push: { friends_request: { id: user } }}))
      .then(() =>  this.getManyWithFriends([user, friend]))
        .then(users => this.getMeAndThey(users, user, friend));
}

schema.statics.confirmFriend = function confirmFriend(user, friend) {
  return this.updateOne({ id: user }, { $pull: { friends_request: { id: friend } }, $push: { friends_confirmed: { id: friend } }})
    .then(() => this.updateOne({ id: friend }, { $pull: { requested_friends: { id: user } }, $push: { friends_confirmed: { id: user } }}))
      .then(() =>  this.getManyWithFriends([user, friend]))
        .then(users => this.getMeAndThey(users, user, friend));
}

schema.statics.cancelRequest = function cancelRequest(user, friend) {
  return this.updateOne({ id: user }, { $pull: { requested_friends: { id: friend} }})
    .then(() => this.updateOne({ id: friend }, { $pull: { friends_request: { id: user } }}))
      .then(() =>  this.getManyWithFriends([user, friend]))
        .then(users => this.getMeAndThey(users, user, friend));
}

schema.statics.existIn = (friends, user) => (friends.find(({ id }) => id === user) || false);

schema.statics.addFriend = function addFriend(user, friend) {
  return this.getMany([user, friend])
    .then(users => {
      const { me, they } = this.getMeAndThey(users, user, friend);
      const isBlocked = this.existIn(they.friends_blocked, user);
      const isFriend = this.existIn(they.friends_confirmed, user);
      const isRequested = this.existIn(they.friends_request, user);
      const hasRequest = this.existIn(they.requested_friends, user);
      if(user === friend) {
        throw new Error('You cannot send request to yourself')
      } else if(isBlocked) {
        throw new Error('user has blocked you')
      } else if (isRequested) {
        return this.cancelRequest(user, friend);
      } else if(isFriend) {
        return { me, they };
      } else if(hasRequest) {
        return this.confirmFriend(user, friend);
      }
      return this.sendRequest(user, friend);
    })
}

schema.statics.rejectFriend = function rejectFriend(user, friend) {
  return this.getMany([user, friend])
    .then(users => {
      const { me, they } = this.getMeAndThey(users, user, friend);
      const isRequested = me.friends_request.find(item => item === friend) || false;
      if(isRequested === false) {
        return this.getManyWithFriends([user, friend])
          .then(users => this.getMeAndThey(users, user, friend));
      }
      return this.cancelRequest(friend, user);
    });
}

schema.statics.blockFriend = function blockFriend(user, friend) {
  return this.get(user)
    .then(me => {
      const isBlocked = me.friends_blocked.find(item => item === friend) || false;
      if(isBlocked) {
        return this.updateOne({ id: user }, { $pull: { friends_blocked: friend } });
      }
      return this.updateOne({ id: user }, { $push: { friends_blocked: friend } });
    }).then(() => this.get(user))
}


module.exports = mongoose.model('users', schema);
