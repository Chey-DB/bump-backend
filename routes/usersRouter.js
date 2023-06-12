const router = require('express').Router();
const usersController = require('../controllers/usersController');

const usersRouter = router;

usersRouter.get('/', usersController.index);

module.exports = usersRouter;

