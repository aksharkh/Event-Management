const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Attendee = require('../models/Attendee');

// @route POST api/attendees
// @desc Add new attendee
// @access Private
router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, event } = req.body;

    try {
        const newAttendee = new Attendee({
            name,
            email,
            event
        });

        const attendee = await newAttendee.save();

        res.json(attendee);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route GET api/attendees
// @desc Get all attendees
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const attendees = await Attendee.find().sort({ date: -1 });
        res.json(attendees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route DELETE api/attendees/:id
// @desc Delete attendee
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let attendee = await Attendee.findById(req.params.id);

        if (!attendee) return res.status(404).json({ msg: 'Attendee not found' });

        await Attendee.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Attendee removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;