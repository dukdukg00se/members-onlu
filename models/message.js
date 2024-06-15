const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: [50, 'Title is too long'],
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
    message: 'Something wrong with user input',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Virtual to return formatted data & time
MessageSchema.virtual('timestamp_formatted').get(function () {
  return this.timestamp.toLocaleString();
});

module.exports = mongoose.model('Message', MessageSchema);
