const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
    attendee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'attendee'
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event'
    }
});

module.exports = mongoose.model('task', TaskSchema);