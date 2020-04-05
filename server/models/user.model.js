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
    default: 0,
  },
  money: {
    type: Number,
    required: true,
    default: 0,
  },
  diamonds: {
    type: Number,
    required: true,
    default: 0,
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
  return this.findOne({ mail, status: true })
    .then((user) => {
      const { level, tutorial, name, mail, picture, id, money, diamonds } = user || {};
      const response = { level, tutorial, name, mail, picture, id, money, diamonds };
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


module.exports = mongoose.model('users', schema);
