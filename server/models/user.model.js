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
  },
  picture: {
    type: String,
    required: true,
  },
  facebook_id:  {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
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
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
});

schema.statics.queryUserStatus = () => ({ status: true,});

schema.statics.queryUser = function queryUser(mail) {
  const query = this.queryUserStatus();
  return { ...query, mail };
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
  const { level, tutorial, name, mail, picture, id, money, diamonds, rank, position } = user || {};
  return { level, tutorial, name, mail, picture, id, money, diamonds, rank, position };
}

schema.statics.exist = function exist(id) {
  return this.findOne({ id })
    .then(user => {
      if(user === null) {
        return false
      }
      return true;
    })
}

schema.statics.add = function add(name, mail, picture, facebookId) {
  const date = new Date().getTime();
  const random = String(Math.random()).split('.').pop();
  const id = parseInt(`${date}${random}`.substring(0, 16), 10);
  const data = {
    name, mail, picture, id, facebook_id: facebookId,
  };
  return this.exist(id)
    .then(exist => {
      if(exist) {
        return this.add(name, mail, picture, facebookId);
      }
      return this.create(data)
        .then(user => {
          return this.get(data.mail);
        })
    });
};

schema.statics.get = function get(mail, photo = false) {
  return this.findOne(this.queryUser(mail))
    .then((user) => {
      const response = this.convertUsers(user);
      const { picture } = response;
      if (user === null) {
        throw new Error(`User doesnt exist`);
      }
      if(photo !== false && photo !== picture) {
        user.picture = photo;
        return user.save()
          .then(() => {
            return response;
          });
      } return response
    });
};

schema.statics.countUser = function countUser() {
  return this.countDocuments();
}

schema.statics.sign = function sign(name, email, picture, facebookId) {
  return this.get(email, picture)
    .catch(err => {
      const { message } = err;
      if(message === 'User doesnt exist') {
        return this.add(name, email, picture, facebookId);
      }
      throw err;
    })
}

schema.statics.rank = function rank() {
  return this.aggregate([
    { $match: this.queryUserStatus()},
    { $addFields: this.queryRank() },
    { $sort: { rank: -1 } },
    { $limit: 3 }
  ])
  .then(ranks => (ranks.map(this.convertUsers)))
}

schema.statics.userRank = function rank(mail) {
  return this.aggregate([
    { $match: this.queryUser(mail)},
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
