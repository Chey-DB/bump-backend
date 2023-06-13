const Post = require("../models/Post");

// get all posts
const index = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  const postData = req.body;

  //assuming their user_id is written in the req
  //assuming all the fields are written
  try {
    const post = await Post.create({ postData });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  const { _id } = req.body;
  const updateData = req.body;
  try {
    const post = await Post.findOneAndUpdate({ _id: _id }, { updateData });
    res.status(200).json({ update: "your file has been updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findOneAndDelete({ _id: id });
    if (!post) {
      res
        .status(400)
        .json({ error: "couldnt find the post that needed to be deleted" });
    }
    res.status(200).json({ delete: "the post has been deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPostsOnly = async (req, res) => {
  try {
    const postOnly = await Post.find({ question: false });
    res.status(200).json(postOnly);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getQuestionsOnly = async (req, res) => {
  try {
    const postOnly = await Post.find({ question: true });
    res.status(200).json(postOnly);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  index,
  createPost,
  updatePost,
  deletePost,
  getPostsOnly,
  getQuestionsOnly,
};
