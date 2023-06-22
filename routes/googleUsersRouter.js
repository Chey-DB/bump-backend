const router = require('express').Router();
const googleUsersController = require('../controllers/googleUserController');

const googleUsersRouter = router;

googleUsersRouter.get('/', googleUsersController.index);
googleUsersRouter.get('/:id', googleUsersController.show);

module.exports = googleUsersRouter;

