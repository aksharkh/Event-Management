const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Task = require('../models/Task');

// @route POST api/tasks
// @desc Add new task
// @access Private
router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty(),
    check('deadline', 'Deadline is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, deadline, status, attendee, event } = req.body;

    try {
        const newTask = new Task({
            name,
            deadline,
            status,
            attendee,
            event
        });

        const task = await newTask.save();

        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route GET api/tasks
// @desc Get all tasks
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find().sort({ date: -1 });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route PUT api/tasks/:id
// @desc Update task status
// @access Private
router.put('/:id', auth, async (req, res) => {
    const { status } = req.body;

    const taskFields = {};
    if (status) taskFields.status = status;

    try {
        let task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ msg: 'Task not found' });

        task = await Task.findByIdAndUpdate(req.params.id, { $set: taskFields }, { new: true });

        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;