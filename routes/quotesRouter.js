const quotesController = require('../controllers/quotesController');
const router = require('express').Router();

const quotesRouter = router;

quotesRouter.get('/', quotesController.index);
quotesRouter.get('/:id', quotesController.show);
quotesRouter.post('/', quotesController.create);
quotesRouter.patch('/:id', quotesController.update);
quotesRouter.delete('/:id', quotesController.destroy);


module.exports = quotesRouter;
