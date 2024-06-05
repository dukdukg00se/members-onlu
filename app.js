const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// Set up express-session
// set session and cookies then check what cookie parser does
// Check req.cookie readout
const session = require('express-session');
const sessionConfig = {
  secret: 'tiger',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 5,
  },
};
app.use(session(sessionConfig));

// Log requests to console
// app.use(logger('dev'));
// Parse req header cookies
// Adds req.cookies obj with cookies
// Instead of req.headers.cookie access w/ req.cookies
// app.use(cookieParser());

app.get('/', (req, res, next) => {
  res.send('<h1>Hello World</h1>');
});

app.listen(3000, () => {
  console.log('Beep Beep Boop.. Listening on port 3000');
});
