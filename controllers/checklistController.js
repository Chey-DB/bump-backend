const Checklist = require("../models/Checklist");


const getAllChecklists = async (req, res) => {
    try {
        const checklists = await Checklist.find({});
        res.json(checklists);
    } catch (error) {
        res.status(500).json({ error: "Failed to get all checklists" });
    }
}

const createChecklist = async (req, res) => {
    try {
        const { user_id, title, content, isCompleted } = req.body;
        const checklist = await Checklist.create({ user_id, title, content, isCompleted });
        res.status(201).json({ checklist });
    } catch (error) {
        res.status(500).json({ error: "Failed to create checklist item" });
    }
};

const getChecklistById = async (req, res) => {
    try {
        const { id } = req.params;
        const checklist = await Checklist.findById(id);
        res.json(checklist);
    } catch (error) {
        res.status(500).json({ error: "Failed to get checklist item" });
    }
}

const getChecklistsByUserId = async (req, res) => {

    try {
      const { user_id } = req.params;
<<<<<<< HEAD
      console.log(user_id);
      const checklists = await Checklist.find({user_id});
=======
      const checklists = await Checklist.find({ user_id: user_id });
>>>>>>> staging
      res.json(checklists);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve checklists by user ID' });
    }

  };

const updateChecklist = async (req, res) => {
    try {
        const { title, content, isCompleted } = req.body;
        const checklist = await Checklist.findByIdAndUpdate(req.params.id, { title, content, isCompleted }, { new: true });
        if (!checklist) {
            res.status(404).json({ error: "Checklist not found" });
        }
        res.json(checklist);
    } catch (error) {
        res.status(500).json({ error: "Failed to update checklist item" });
    }
}

const deleteChecklistById = async (req, res) => {
    try {
        const { id } = req.params;
        const checklist = await Checklist.findByIdAndDelete(id);
        if (!checklist) {
            res.status(404).json({ error: "Checklist not found" });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete checklist item" });
    }
}

module.exports = {
    createChecklist,
    getAllChecklists,
    getChecklistById,
    getChecklistsByUserId,
    updateChecklist,
    deleteChecklistById
}
