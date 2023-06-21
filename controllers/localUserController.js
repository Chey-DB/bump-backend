const LocalUser = require("../models/LocalUser");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const localUser = await LocalUser.findOne({ username: req.body.username });
  if (localUser) {
    res
      .status(400)
      .json({
        message: { msgBody: "Username is already taken", msgError: true },
      });
  } else {
    const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS));

    const newLocalUser = await LocalUser({
      username,
      password: hashedPassword,
    });
    try {
      const createLocalUser = await LocalUser.create(newLocalUser);
      res
        .status(201)
        .json({
          message: { msgBody: "Account successfully created", msgError: false },
          localUser: createLocalUser,
        });
    } catch (err) {
      res
        .status(500)
        .json({ message: { msgBody: "Error has occured", msgError: true } });
    }
  }
};

module.exports = { register };
