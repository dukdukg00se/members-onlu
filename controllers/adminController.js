const Message = require('../models/message');
const User = require('../models/user');

const asyncHandler = require('express-async-handler');

exports.index = (req, res, next) => {
  res.render('admin', {
    title: 'Admin',
  });
};
