"use strict";
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
passport.use(new GoogleStrategy({
    clientID: '995999949533-ccacl78u7r6nnv7b2clu3hu7h0qbiuoa.apps.googleusercontent.com',
    clientSecret: 'Dm77mKHuxxiHiqBt_XAJLBBP',
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true
}, function (request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
    });
}));
