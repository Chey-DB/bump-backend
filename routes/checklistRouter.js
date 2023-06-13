const router = require('express').Router();
const checklistController = require('../controllers/checklistController');

const checklistRouter = router;

checklistRouter.get('/checklists', checklistController.getAllChecklists);
checklistRouter.post('/checklists', checklistController.createChecklist);
checklistRouter.get('/checklists/:id', checklistController.getChecklistById);
checklistRouter.put('/checklists/:id', checklistController.updateChecklist);
checklistRouter.delete('/checklists/:id', checklistController.deleteChecklistById);

module.exports = checklistRouter;
