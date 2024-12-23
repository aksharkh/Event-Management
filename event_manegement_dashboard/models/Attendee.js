const mongoose = require('mongoose');

const AttendeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event'
    }
});

module.exports = mongoose.model('attendee', AttendeeSchema);