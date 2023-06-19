const LocalUser = require('../models/LocalUser');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const { username, password } = req.body;
    LocalUser.findOne({ username: req.body.username },  async (err, localUser) => {
        if (err) {
            res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
        }
        if (localUser) {
            res.status(400).json({ message: { msgBody: "Username is already taken", msgError: true } });
        }
        else {
            const hashedPassword = bcrypt.hash(password, process.env.BCRYPT_SALT_ROUNDS);
            const newLocalUser = await LocalUser({
                username,
                password: hashedPassword
            });
    try {
        const localUser = await LocalUser.create(newLocalUser);
        res.status(201).json({ message: { msgBody: "Account successfully created", msgError: false } });
    } catch (err) {
        res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
    }
        }
    });
};

module.exports = register;



