const Calendar = require("../models/Calendar");


const createEvent = async (req, res) => {
    const user_id = req.user._id
    try {
        const {date, time, title, description} = req.body;
        const event = await Calendar.create({date, time, title, description, user_id});
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: "Failed to create an event" });
    }
}


const getEvents = async (req, res) => {
    try {
        const events = await Calendar.find({})
        res.send(events)
    } catch (error) {
        res.status(500).json({ error: "Failed to view all events" });
    }
}

const getEventByUserId = async (req, res) => {
    try {
      const user_id  = req.user._id;
      const event = await Calendar.find({ user_id });
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve Event by user ID' });
    }
  };

const updateEvent = async (req, res) => {
    
    try {
        const event = await Calendar.findByIdAndUpdate(req.user._id, 
            {$set: req.body})
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: "Failed to update the event" });
    }
};

const deleteEvent = async (req, res) => {

    try {
        const event = await Calendar.findByIdAndRemove(req.user._id)
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete the event" });
    }
};


module.exports = {createEvent, getEvents, updateEvent, deleteEvent, getEventByUserId}
