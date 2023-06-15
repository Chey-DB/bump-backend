const router = require('express').Router();
const calendarController = require('../controllers/calendarController');

const calendarRouter = router;

calendarRouter.post('/', calendarController.createEvent);
calendarRouter.get('/', calendarController.getEvents);
calendarRouter.get('/user/:userId', calendarController.getEventByUserId);
calendarRouter.patch('/:id', calendarController.updateEvent);
calendarRouter.delete('/:id', calendarController.deleteEvent);


module.exports = calendarRouter;
