const mongoose = require("mongoose");

const journalSchema = mongoose.Schema;

const Journal = new journalSchema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: () => Date.now()
  },
  symptoms: {
    type: [String],
    required: false,
  },
  mood: {
    type: [String],
    required: false,
  }
});

module.exports = mongoose.model("Journal", Journal);