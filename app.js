const express = require('express')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const usersRouter = require('./routes/usersRouter')
const client = require('./database/setup')
const GoogleStrategy = require('passport-google-oauth20').Strategy

client()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
)

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  return done(null, id)
})
  

// Passport
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/users/auth/google/callback"
},
(accessToken, refreshToken, profile, cb) => {
  User.findOrCreate({ googleId: profile.id }, (err, user) => {
    return cb(err, user)
  })
}))


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });



app.get('/', (req , res) => {
  res.send('hello from simple server :)')
})

app.use('/users', usersRouter)

module.exports = app
