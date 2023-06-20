const Settings = require('../models/Settings');

const index = async (req, res) => {
    try {
        const settings = await Settings.find({});
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: "Failed to get all settings" });
    }
}

const show = async (req, res) => {
    try {
        const userSettings = await Settings.findById(req.user._id);
        res.json(userSettings);
    } catch (error) {
        res.status(500).json({ error: "Failed to get settings item" });
    }
}

const create = async (req, res) => {
    req.user._id = user_id;
    try {
        const { user_id, title, content, isCompleted } = req.body;
        const settings = await Settings.create({ user_id, title, content, isCompleted });
        res.status(201).json({ settings });
    } catch (error) {
        res.status(500).json({ error: "Failed to create settings item" });
    }
}

const update = async (req, res) => {
    try {
        const { name, addressLine1, addressLine2, city, postcode, dueDate, currentWeek, relationshipStatus, about } = req.body;
        const settings = await Settings.findByIdAndUpdate(req.user.id, { name, addressLine1, addressLine2, city, postcode, dueDate, currentWeek, relationshipStatus, about }, { new: true });
        if (!settings) {
            res.status(404).json({ error: "Settings not found" });
        }
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: "Failed to update settings item" });
    }
}

const destroy = async (req, res) => {
    try {
        const userSettings = await Settings.findByIdAndDelete(req.user._id);
        if (!userSettings) {
            res.status(404).json({ error: "Settings not found" });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete settings item" });
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy
}