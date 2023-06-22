const Quotes = require("../models/Quotes");

const index = async (req, res) => {
    const quotes = await Quotes.find({});
    res.json(quotes);
    }

const show = async (req, res) => {
    const quote = await Quotes.findById(req.params.id);
    res.json(quote);
    }

const create = async (req, res) => {
    const quote = await Quotes.create(req.body);
    res.json(quote);
    }

const update = async (req, res) => {
    const quote = await Quotes.findById(req.params.id);
    Object.assign(quote, req.body);
    await quote.save();
    res.json(quote);
    }

const destroy = async (req, res) => {
    const quote = await Quotes.findByIdAndDelete(req.params.id);
    res.json(quote);
    }

module.exports = {
    index,
    show,
    create,
    update,
    destroy
}
