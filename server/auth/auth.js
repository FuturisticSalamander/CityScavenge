var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/userModel.js');
var port = process.env.PORT || 1337;

var googleKey = {
  CLIENTID: process.env.GOOGLE_KEY,
  CLIENTSECRET: process.env.GOOGLE_CLIENT_SECRET,
};

if (!process.env.TRAVIS) {
  googleKey = require(__dirname + '/../config/googlemaps.js');
}

// Middleware for checking whether the user is logged in
exports.checkAuth = function (req, res, next) {
  console.log('checkAuth');
  if (req.session.passport ? req.session.passport.user : false) {
    next();
  } else {
    console.log('ckeckAuth error');
    req.session.error = 'Bad credentials.';
    res.redirect('/');
  }
};

exports.handleGoogleLogin = passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ],
});

exports.authenticateGoogleLogin = passport.authenticate('google', {
  failureRedirect: '/',
});

exports.logout = function (req, res, next) {
  delete req.user;
  req.session.destroy();
  res.redirect('/');
};

passport.use(new GoogleStrategy({
  clientID: googleKey.CLIENTID,
  clientSecret: googleKey.CLIENTSECRET,
  callbackURL: 'http://localhost:1337/api/v1/auth/google/callback',
}, function (accessToken, refreshToken, profile, done) {
  User.findOrCreate(profile.displayName, profile.id, profile.name.givenName, function (err, user) {
    return done(err, user);
  });
}));

/*
serializeUser and deserializeUser are two required Passport methods that are
called when using sessions with Passport. Sessions are saved via cookies
rather than via login credentials.
*/

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  if (user) {
    User.findUser('google_id', user.google_id, function (err, result) {
      if (err) {
        console.log('google error: ', err);
        return done(err);
      } else if (!result[0]) {
        done(err, null);
      } else {
        done(err, result[0]);
      }
    });
  }
});
