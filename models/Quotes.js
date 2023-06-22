const mongoose = require("mongoose");

const QuotesSchema = mongoose.Schema

const Quotes = new QuotesSchema({
    quote: {
        type: Array,
        required: true,
    }});

module.exports = mongoose.model("Quotes", Quotes);
