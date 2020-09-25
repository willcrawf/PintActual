const config = require('./google');
const User = require('../models/user')

const GoogleOAuthStrategy = require('passport-google-oauth20').Strategy;
module.exports = (passport) => {
  passport.serializeUser(function(user, done) {done(null, user.id)});
  passport.deserializeUser(function(id, done) {
    User.findOne({ _id: id }, function(err, user) {
      if (err) return done(err)
      return done(null, user)
    })
  })
  passport.use(new GoogleOAuthStrategy(
      {
        clientID: config.gClientID,
        clientSecret: config.gClientSecret,
        callbackURL: config.gCb,
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
      },
      (token, refreshToken, profile, done) => {
        User.findOne({ gId: profile.id }, (err, user) => {
          if (err) console.log(err)
          if (user) {
            user.set({ 
              token, 
              gRefreshToken: refreshToken 
            })
            user.save()
              .then(user => done(null, user))
          } else {
            var newUser = new User({
              gId: profile.id,
              gName: profile.displayName,
              // gEmail: profile.emails[0].value,
              token,
              gRefreshToken: refreshToken,
              profile,
            })
            newUser.save()
            .then(newUser => done(null, newUser))
          }
        })
      }
  ))
}