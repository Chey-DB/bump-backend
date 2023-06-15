const User = require("../models/User");

const index = async (req, res) => {
    const users = await User.find({});
    res.json(users);
    }

const show = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
    }

const create = async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
    }

const update = async (req, res) => {
    const user = await User.findById(req.params.id);
    Object.assign(user, req.body);
    await user.save();
    res.json(user);
    }

const destroy = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json(user);
    }

module.exports = {
    index,
    show,
    create,
    update,
    destroy
}
