const mongoose = require("mongoose");

const postSchema = mongoose.Schema;

const Post = new postSchema(
  {
    user_id: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String },
    image: { type: String },
    comments: { type: Array },
    question: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", Post);
