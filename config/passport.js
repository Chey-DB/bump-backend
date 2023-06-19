const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const LocalUser = require("../models/LocalUser");
const mongoose = require("mongoose");
const GoogleUser = require("../models/GoogleUser");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, cb) => {
        const newGoogleUser = {
            googleId: profile.id,
            username: profile.displayName,
            profilePic: profile.photos[0].value
        };
        try {
          let googleUser = await GoogleUser.findOne({ googleId: profile.id });

          if (googleUser) {
            cb(null, googleUser);
          } else {
            googleUser = await GoogleUser.create(newGoogleUser);
            cb(null, googleUser);
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

  passport.deserializeUser(async (id, done) => {
    try {
      const googleUser = await GoogleUser.findById(id);
      done(null, googleUser);
    } catch (err) {
      done(err);
    }
  });
  
},

function (passport) {

  passport.use(
    new LocalStrategy((username, password, done) => {
      LocalUser.findOne({ username: username }, (err, localUser) => {
        if (err) {
          return done(err);
        }
        if (!localUser) {
          return done(null, false, { message: "Incorrect credentials" });
        }
        bcrypt.compare(password, localUser.password, (err, res) => {
          if (err) {
            return done(err);
          }
          if (res) {
            return done(null, localUser);
          } else {
            return done(null, false, { message: "Incorrect credentials" });
          }
        });
      });
    })
  );

  passport.serializeUser((localUser, done) => {
    done(null, localUser.id);
  });

  passport.deserializeUser((id, done) => {
    LocalUser.findById(id, (err, localUser) => {
      done(err, localUser);
    });
  });
}



