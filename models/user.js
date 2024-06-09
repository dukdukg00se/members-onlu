const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    minLength: [3, 'First name too short'],
    maxLength: 100,
  },
  last_name: {
    type: String,
    required: true,
    minLength: [2, 'First name too short'],
    maxLength: 100,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['basic', 'premium'],
    default: 'basic',
  },
});

module.exports = mongoose.model('User', UserSchema);
