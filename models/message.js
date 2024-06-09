const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: [10, 'Title is too long'],
  },
  message: {
    type: String,
    required: true,
    minLength: [2, 'Message is too short'],
    maxLength: [100, 'Message is too long'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Message', MessageSchema);
