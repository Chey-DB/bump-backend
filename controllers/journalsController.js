const Journal = require("../models/Journal");

const index = async (req, res) => {
  try {
    const response = await Journal.find({});
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Journal.findById(id);
    if (!response) {
      return res.status(404).json({ error: 'Not Found', message: 'Journal entry not found' });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request', message: error.message });
  }
};

const create = async (req, res) => {
  const data = req.body;
 
  try {
    const journal = new Journal(data);
    const savedJournal = await journal.save();
    res.status(201).send(savedJournal);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      res.status(400).json({ error: 'Validation Error', message: validationErrors });
    } else {
      res.status(500).json({ error: 'Server Error', message: error.message });
    }
  }
};



const update = async (req, res) => {
  const { id } = req.params;
  const { title, content, symptoms, mood } = req.body;

  try {
    const response = await Journal.findByIdAndUpdate(
      id,
      { title, content, symptoms, mood },
      { new: true }
    );
    if (!response) {
      return res.status(404).json({ error: 'Not Found', message: 'Journal entry not found' });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request', message: error.message });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Journal.findByIdAndDelete(id);
    if (!response) {
      return res.status(404).json({ error: 'Not Found', message: 'Journal entry not found' });
    }
    res.status(202).json({ message: 'Journal entry deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Bad Request', message: error.message });
  }
};

module.exports = {
  index,
  create,
  getById,
  update,
  destroy
};
