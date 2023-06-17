const User = require("../models/GoogleUser");

const index = async (req, res) => {
    const googleUsers = await GoogleUser.find({});
    res.json(googleUsers);
    }

const show = async (req, res) => {
    const googleUser = await GoogleUser.findById(req.params.id);
    res.json(googleUser);
    }

const create = async (req, res) => {
    const googleUser = await GoogleUser.create(req.body);
    res.json(googleUser);
    }

const update = async (req, res) => {
    const googleUser = await GoogleUser.findById(req.params.id);
    Object.assign(googleUser, req.body);
    await googleUser.save();
    res.json(googleUser);
    }

const destroy = async (req, res) => {
    const googleUser = await GoogleUser.findByIdAndDelete(req.params.id);
    res.json(googleUser);
    }

module.exports = {
    index,
    show,
    create,
    update,
    destroy
}
