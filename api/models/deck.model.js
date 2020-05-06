const mongoose = require('mongoose');
const { decks, cards, colors } = require('../constants');

const { Schema } = mongoose;

const schema = new Schema({
  deck: {
    type: String,
    required:true,
    enum : decks,
    default: decks[0],
  },
  type: {
    type: String,
    required: true,
    enum: cards,
  },
  finish: {
    type: Boolean,
    required: true,
    default: false,
  },
  info: {
    type: new Schema({
      color: {
        type: String,
        required: true,
        enum: colors,
        default: colors[0],
      },
      number: {
        type: Number,
        required: false,
      },
    }),
    required: true,
  },
});

module.exports = mongoose.model('decks', schema);
