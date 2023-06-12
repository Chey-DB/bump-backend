const mongoose = require("mongoose");

const UserSchema = mongoose.Schema;

const User = new UserSchema({
  username: {
    type: String,
    required: false,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    required: false,
  },
  googleUsername: {
    type: String,
    required: false,
  },
  profilePic: {
    type: String,
    required: false,
  },
  dueDate: {
    type: Date,
    required: false,
  },
  currentWeek: {
    type: Number,
    required: false,
  },
  about: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", User);

