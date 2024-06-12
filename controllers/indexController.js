const Message = require('../models/message');
const User = require('../models/user');

const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
  const [allMsgs, allUsers] = await Promise.all([
    Message.find().exec(),
    User.find({}, 'first_name last_name').exec(),
  ]);

  console.log(allMsgs, allUsers);

  res.render('index', {
    title: 'Members Only',
  });
});
