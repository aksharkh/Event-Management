const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator'); //add check after validator


const User = require('../models/User');
const Event = require('../models/Event');

// @route GET api/events
// @desc Get all users events
// @access Private
router.get('/', auth , async (req,res) => {
    try {
        const events = await Event.find({ user : req.user.id }).sort({ date : -1 });
        res.json(events)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route POST api/events
// @desc Add new event 
// @access Private
router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty()
]] , async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name , description, startdatetime, enddatetime, type } = req.body;

    try {
        const newEvent = new Event({
            name,
            description,
            startdatetime,
            enddatetime,
            type,
            user : req.user.id
        });

        const event= await newEvent.save();

        res.json(event);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route PUT api/events/:id
// @desc Update event
// @access Private
router.put('/:id', auth , async (req,res) => {
    const { name , description, startdatetime, enddatetime, type } = req.body;

    //Build event object
    const eventsField = {};

    if(name) eventsField.name = name;
    if(description) eventsField.description = description;
    if(startdatetime) eventsField.startdatetime = startdatetime;
    if(enddatetime) eventsField.enddatetime = enddatetime;
    if(type) eventsField.type = type;

    try {
        let event = await Event.findById(req.params.id);

        if(!event) return res.status(404).json({ msg : 'Event not found!'});

        //Make sure user owns events
        if (event.user.toString() !== req.user.id) {
            return res.status(401).json({ msg : 'Not authorized!'});
        }

        event = await Event.findByIdAndUpdate(req.params.id, {
            $set : eventsField
        }, {
            new : true 
        });

        res.json(event);

    } catch (err) {
        console.error(err.message);
        res.send(500).send('Server Error');
    }
});

// @route DELETE api/events/:id
// @desc Delete event
// @access Private
router.delete('/:id', auth , async(req,res) => {
    try {
        let event = await Event.findById(req.params.id);

        if(!event) return res.status(404).json({ msg : 'Event not found!'});

        //Make sure user owns events
        if (event.user.toString() !== req.user.id) {
            return res.status(401).json({ msg : 'Not authorized!'});
        }

        await Event.findByIdAndRemove(req.params.id);

        res.json({ msg : 'Event Removed!'} );

    } catch (err) {
        console.error(err.message);
        res.send(500).send('Server Error');
    }
});

module.exports = router;