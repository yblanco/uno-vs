const mongoose = require('mongoose');

const { Schema } = mongoose;



const schema = new Schema({
  id: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  socket: {
    type: String,
    required: true,
  },
  connect: {
    type: Date,
    require: true,
    default: Date.now,
  },
  disconnect: {
    type: Date,
  },
});

schema.statics.queryDisconnectFalse = () => ({ disconnect: { $exists: false }});

schema.statics.queryDisconnectById = function queryDisconnectById(id) {
  return ({ id, ...this.queryDisconnectFalse()});
}
schema.statics.queryDisconnect = function queryDisconnect(socket) {
  return { socket, ...this.queryDisconnectFalse() };
}
schema.statics.getOnline = function getOnline(id) {
  return this.find(this.queryDisconnectById(id));
}

schema.statics.isOnline = function isOnline(socket) {
  return this.findOne({ socket })
    .then(log => {
      console.log("===>", log)
      const { id = '' } = log === null ? {} : log;
      return this.getOnline(id)
        .then(logs => ({ id, online: logs.length > 0 }));
    });
}

schema.statics.logIn = function logIn(id, ip, socket) {
  return this.create({ id, ip, socket });
}

schema.statics.logOut = function logOut(socket) {
  return this.updateMany(this.queryDisconnect(socket), { disconnect: new Date() })
    .then(() => this.isOnline(socket));
}

module.exports = mongoose.model('logs', schema);
