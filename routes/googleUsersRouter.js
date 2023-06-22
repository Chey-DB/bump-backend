const router = require("express").Router();
const googleUsersController = require("../controllers/googleUserController");

const googleUsersRouter = router;

googleUsersRouter.get("/", googleUsersController.index);
googleUsersRouter.get("/:id", googleUsersController.show);
googleUsersRouter.patch("/:id", googleUsersController.update);

module.exports = googleUsersRouter;
