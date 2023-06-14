const router = require('express').Router();
const checklistController = require('../controllers/checklistController');

const checklistRouter = router;

checklistRouter.get('/', checklistController.getAllChecklists);
checklistRouter.post('/', checklistController.createChecklist);
checklistRouter.get('/:id', checklistController.getChecklistById);
checklistRouter.get('/user/:user_id', checklistController.getChecklistsByUserId);
checklistRouter.put('/:id', checklistController.updateChecklist);
checklistRouter.delete('/:id', checklistController.deleteChecklistById);

module.exports = checklistRouter;
