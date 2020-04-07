const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    require: true,
    default: Date.now,
  },
  status: {
    type: String,
    enum : ['LOGIN', 'LOGOUT'],
    default: 'LOGIN'
  },

});

schema.statics.logIn = function logIn(id, ip) {
  return this.create({ id, ip });
}

module.exports = mongoose.model('logs', schema);
