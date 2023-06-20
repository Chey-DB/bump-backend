const mongoose = require("mongoose");

const SettingsSchema = mongoose.Schema

const Settings = new SettingsSchema({
    user_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    addressLine1: {
        type: String,
        required: false,
    },
    addressLine2: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    postcode: {
        type: String,
        required: false,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    currentWeek: {
        type: Number,
        required: true,
    },
    relationshipStatus: {
        type: String,
        required: false,
    },
    about: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model("Settings", Settings);
