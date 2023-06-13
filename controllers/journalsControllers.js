const Journal = require("../models/Journal");

const index = async (req, res) => {
  try {
    const response = Journal.find({})
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};