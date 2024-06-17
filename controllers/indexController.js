const Message = require('../models/message');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const passport = require('passport');
require('../config/passport');

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
  res.render('login_form', { title: 'Account Login' });
};

exports.login_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/signup',
});

exports.signup_get = (req, res, next) => {
  res.render('signup_form', { title: 'Account Signup' });
};

exports.signup_post = asyncHandler(async (req, res, next) => {
  const hash = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.username,
    password: hash,
    status: req.body.status,
  });

  await user.save();
  res.redirect('/');
});

exports.message_create_get = (req, res, next) => {
  res.render('message_form', {
    title: 'New Message',
  });
};
