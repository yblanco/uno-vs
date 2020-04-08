const mongoose = require('mongoose');

const { Schema } = mongoose;

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
    default: 100,
  },
  diamonds: {
    type: Number,
    required: true,
    default: 1,
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

schema.statics.convertUsers = (user) => {
  const { level, tutorial, name, mail, picture, id, money, diamonds, rank, position, ip, online } = user || {};
  return { level, tutorial, name, mail, picture, id, money, diamonds, rank, position, ip, online };
}

schema.statics.add = function add(name, mail, picture, id, from, ip) {
  const data = {
    name, mail, picture, id, ip, from
  };
  return this.create(data)
    .then(user => this.get(user.id));
};

schema.statics.get = function get(id) {
  return this.findOne(this.queryUser(id))
    .then((user) => {
      const response = this.convertUsers(user);
      const { picture } = response;
      if (user === null) {
        throw new Error(`User doesnt exist`);
      }
      return response
    });
};

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

schema.statics.sign = function sign(name, email, picture, appId, from, ip) {
  const id = `${from}_${appId}_${name.replace(/[^a-z0-9_]/gi, '').split(' ').join('-')}`;
  return this.get(id)
    .catch(err => {
      const { message } = err;
      if(message === 'User doesnt exist') {
        return this.add(name, email, picture, id, from, ip);
      }
      throw err;
    })
    .then(user => this.updateUser(user.id, true, picture)
      .then((userLogIn) => this.model('logs').logIn(userLogIn)
        .then(() => userLogIn)));
}

schema.statics.check = function check(id) {
  return this.get(id)
    .then(user => this.updateUser(user.id, true))
}

schema.statics.logout = function logout(id) {
  return this.get(id)
    .catch(err => {
      if(message === 'User doesnt exist') {
        return { id };
      }
      throw err;
    })
    .then(user => this.updateUser(user.id, false));
}

schema.statics.countUser = function countUser() {
  return this.countDocuments(this.queryUserStatus());
}

schema.statics.rank = function rank() {
  return this.aggregate([
    { $match: this.queryUserStatus()},
    { $addFields: this.queryRank() },
    { $sort: { rank: -1, date: 1 } },
    { $limit: 10 }
  ])
  .then(ranks => (ranks.map(this.convertUsers)))
}

schema.statics.userRank = function rank(id) {
  return this.aggregate([
    { $match: this.queryUser(id)},
    { $addFields: this.queryRank() },
  ]).then(userRank => {
    const user = userRank.pop() || {};
    const { rank = 0, id = false } = user;
    let userFinal = null;
    if(id === false) {
      return this.countUser()
        .then(position => ({ rank, position }))
    }
    return this.getRank(rank)
      .then(position => ({ rank, position }));
  })
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



module.exports = mongoose.model('users', schema);
