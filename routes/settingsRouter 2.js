const settingsController = require('../controllers/settingsController');
const router = require('express').Router();

const settingsRouter = router;

settingsRouter.get('/', settingsController.index);
settingsRouter.get('/:id', settingsController.show);
settingsRouter.post('/', settingsController.create);
settingsRouter.patch('/:id', settingsController.update);
settingsRouter.delete('/:id', settingsController.destroy);


module.exports = settingsRouter;
