#! /usr/bin/env node

/* eslint-disable max-len */
console.log(
  'This script populates a user and some messages. Specify database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const bcrypt = require('bcryptjs');
const User = require('./models/user');
const Message = require('./models/message');

const users = [];
const messages = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log('Uggghh ', err));
async function main() {
  console.log('About to connect');
  await mongoose.connect(mongoDB);
  console.log('Should be connected?');

  await createUsers();
  await createMessages();

  console.log('Closing mongoose');
  mongoose.connection.close();
}

async function userCreate(
  index,
  first_name,
  last_name,
  email,
  password,
  status
) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userDetail = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
    };

    if (status !== false) userDetail.status = status;

    const user = new User(userDetail);

    await user.save();
    users[index] = user;
    console.log(`Added user: ${first_name} ${last_name}`);
  } catch (err) {
    console.log('Bleeech, something wrong');
    console.error(err);
  }
}

async function messageCreate(index, title, message, user) {
  const messageDetail = {
    title,
    message,
    user,
  };

  const msg = new Message(messageDetail);
  await msg.save();
  messages[index] = msg;
  console.log(`Added message: ${title}`);
}

async function createUsers() {
  console.log('Adding users');

  await Promise.all([
    userCreate(0, 'Langston', 'Hughes', 'lh@hot.com', '123', false),
    userCreate(1, 'Jim', 'Bob', 'jb@yahoo.com', '123', 'premium'),
  ]);
}

async function createMessages() {
  console.log('Adding messages');

  await Promise.all([
    messageCreate(
      0,
      'Hello World',
      'Hope the world is better today!',
      users[0]
    ),
    messageCreate(
      1,
      'Weather',
      'Severe weather expected today in Bermuda.',
      users[0]
    ),
    messageCreate(
      2,
      'Free',
      'Free donuts at 2 today at main street.',
      users[1]
    ),
  ]);
}
