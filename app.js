const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const path = require('path'); // core node module for parsing file & dir paths

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');

// Initialize app
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set up mongoose connection
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URI;
main().catch((err) => console.log('Oops! ', err));
async function main() {
  await mongoose.connect(mongoDB);
}

// Set up express-session
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
app.use(logger('dev'));
// Parse req header cookies
// Adds req.cookies obj with cookies
// Instead of req.headers.cookie access w/ req.cookies
app.use(cookieParser());
// Built-in middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// ** Routes **
app.use('/', indexRouter);
app.use('/admin', adminRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler - need to be last
app.use((err, req, res, next) => {
  // Set local variables
  res.locals.message = err.message;
  // Only provide err in development
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
