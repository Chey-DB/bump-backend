const router = require('express').Router();
const journalsController = require('../controllers/journalsController');

const journalsRouter = router;

journalsRouter.get('/', journalsController.index);
journalsRouter.get('/:id', journalsController.getById)
journalsRouter.get('/user/:userId', journalsController.indexForUser)
journalsRouter.post('/', journalsController.create)
journalsRouter.patch('/:id', journalsController.update)
journalsRouter.delete('/:id', journalsController.destroy)

module.exports = journalsRouter;
