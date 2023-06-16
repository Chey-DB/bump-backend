const mongoose = require("mongoose");

const UserSchema = mongoose.Schema

const User = new UserSchema({
  method: {
    type: String,
    enum: ['local', 'google'],
    required: true
  },
  local: {
    username: {
      type: String,
      lowercase: true,
    },
    password: {
      type: String,
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
    }
  },
  google: {
    id: {
      type: String,
    },
    username: {
      type: String,
      lowercase: true,
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
    }
  }
});

User.pre('save', function(next) {
  if (this.method === 'google') {
    this.local = undefined;
  } else if (this.method === 'local') {
    this.google = undefined;
  }
  next();
});

module.exports = mongoose.model("User", User);


// const User = new UserSchema({
//   method: {
//     type: String,
//     enum: ['local', 'google'],
//     required: true
//   },
//   local: {
//     username: {
//       type: String,
//       lowercase: true,
//       validate: {
//         validator: function() {
//           return this.method === 'local' ? this.local.username !== '' : true;
//         },
//         message: 'Username required for local method'
//       }
//     },
//     password: {
//       type: String,
//       validate: {
//         validator: function() {
//           return this.method === 'local' ? this.local.password !== '' : true;
//         },
//         message: 'Password required'
//       }
//     },
//     profilePic: {
//           type: String,
//           required: false,
//         },
//         dueDate: {
//           type: Date,
//           required: false,
//         },
//         currentWeek: {
//           type: Number,
//           required: false,
//         },
//         about: {
//           type: String,
//           required: false,
//         }
//   },
//   google: {
//     id: {
//       type: String,
//       validate: {
//         validator: function() {
//           return this.method === 'google' ? this.google.id !== '' : true;
//         },
//         message: 'Google id required'
//       }
//     },
//     username: {
//       type: String,
//       lowercase: true,
//       validate: {
//         validator: function() {
//           return this.method === 'google' ? this.google.givenName !== '' : true;
//         },
//         message: 'Username required for google method'
//       }
//     },
//     profilePic: {
//           type: String,
//           required: false,
//         },
//         dueDate: {
//           type: Date,
//           required: false,
//         },
//         currentWeek: {
//           type: Number,
//           required: false,
//         },
//         about: {
//           type: String,
//           required: false,
//         }
//   }
// });

