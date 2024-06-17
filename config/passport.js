const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user');

passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      // Remember username is EMAIL!
      const user = await User.findOne({ email: username });
      if (!user) return done(null, false);

      const match = await bcrypt.compare(password, user.password);
      if (!match) return done(null, false);

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
