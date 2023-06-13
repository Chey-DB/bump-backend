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


module.exports = {createEvent, getEvents}
