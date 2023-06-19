const mongoose = require("mongoose");

const ChecklistSchema = mongoose.Schema;

const Checklist = new ChecklistSchema({
    user_id: {
        type:String,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: false,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model("Checklist", Checklist);