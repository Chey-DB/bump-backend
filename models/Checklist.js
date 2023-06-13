const mongoose = require("mongoose");

const checklist = mongoose.Schema({
    user_id: {
        type:mongoose.Schema.Types.ObjectId,
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

const Checklist = mongoose.model("Checklist", checklist);

module.exports = Checklist;
