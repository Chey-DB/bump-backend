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
const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Post.findById(id);

    if (!response) {
      return res
        .status(404)
        .json({ error: "Not Found", message: "Post not found" });
    }
    res.status(200).json(response);
  } catch (error) {}
};
const create = async (req, res) => {
  const postData = req.body;
  //assuming their user_id is written in the req
  //assuming all the fields are written
  try {
    const response = await Post.create(postData);
    res.status(200).json(response);
  } catch (error) {
    if (error.name === "ValidationError") {
      res
        .status(400)
        .json({ error: "Validation Error", message: error.message });
    } else {
      res.status(500).json({ error: "Server Error", message: error.message });
    }
  }
};

const update = async (req, res) => {
  const { _id } = req.body;
  const updateData = req.body;
  try {
    const response = await Post.findOneAndUpdate({ _id: _id }, updateData);
    if (!response) {
      return res
        .status(404)
        .json({ error: "Not found", message: "Post to update not found" });
    }
    res.status(200).json({ update: "your file has been updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const destroy = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await Post.findOneAndDelete({ _id: id });
    if (!response) {
      res.status(400).json({
        error: "Not Found",
        message: "Couldnt find the post that needed to be deleted",
      });
    }
    res.status(200).json({ message: "The post has been deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPostsOnly = async (req, res) => {
  try {
    const response = await Post.find({ question: false });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getQuestionsOnly = async (req, res) => {
  try {
    const response = await Post.find({ question: true });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  index,
  getById,
  create,
  update,
  destroy,
  getPostsOnly,
  getQuestionsOnly,
};
