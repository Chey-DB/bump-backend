const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, cb) => {
        const newUser = {
          method: "google",
          google: {
            id: profile.id,
            username: profile.displayName,
            profilePic: profile.photos[0].value
          }
        };
        try {
          let user = await User.findOne({ "google.id": profile.id });

          if (user) {
            cb(null, user);
          } else {
            user = await User.create(newUser);
            cb(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // passport.deserializeUser((id, done) => {
  //     User.findById(id, (err, user) => done(err, user));
  // });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
  
};
