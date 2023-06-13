const router = require('express').Router();
const checklistController = require('../controllers/checklistController');

const checklistRouter = router;

checklistRouter.get('/', checklistController.getAllChecklists);
checklistRouter.post('/', checklistController.createChecklist);
checklistRouter.get('/:id', checklistController.getChecklistById);
checklistRouter.put('/:id', checklistController.updateChecklist);
checklistRouter.delete('/:id', checklistController.deleteChecklistById);

module.exports = checklistRouter;
