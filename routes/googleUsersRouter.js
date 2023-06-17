const router = require('express').Router();
const usersController = require('../controllers/googleUserController');

const googleUsersRouter = router;

googleUsersRouter.get('/', usersController.index);

module.exports = googleUsersRouter;

