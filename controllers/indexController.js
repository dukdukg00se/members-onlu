const Message = require('../models/message');
const User = require('../models/user');

const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
  const allMsgs = await Message.find()
    .populate({ path: 'user', select: 'first_name last_name' })
    .exec();

  res.render('index', {
    title: 'Members Only',
    messages: allMsgs,
  });
});

exports.login_get = (req, res, next) => {
  res.render('login', { title: 'Account Login' });
};

exports.login_post = asyncHandler(async (req, res, next) => {
  res.send('Repond with login post resource');
});

exports.signup_get = (req, res, next) => {
  res.render('signup', { title: 'Account Signup' });
};

exports.signup_post = asyncHandler(async (req, res, next) => {
  res.send('Resond with signup post resource');
});
