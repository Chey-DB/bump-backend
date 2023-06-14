const Calendar = require("../models/Calendar");


const createEvent = async (req, res) => {
    try {
        const event = Calendar(req.body);
        await event.save();
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ error: "Failed to create an event" });
    }
}


const getEvents = async (req, res) => {
    try {
        const events = await Calendar.find({
            start: { $gte: moment(req.query.start).toDate()}, 
            end: { $lte: moment(req.query.end).toDate()}})
        res.send(events)
    } catch (error) {
        res.status(500).json({ error: "Failed to view all events" });
    }
}

const updateEvent = async (req, res) => {
    
    try {
        const event = await Calendar.findByIdAndUpdate(req.params.id, 
            {$set: req.body})
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: "Failed to update the event" });
    }
};

const deleteEvent = async (req, res) => {

    try {
        const event = await Calendar.findByIdAndRemove(req.params.id)
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete the event" });
    }
};


module.exports = {createEvent, getEvents, updateEvent, deleteEvent}
