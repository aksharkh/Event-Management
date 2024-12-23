const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    description:{
      type: String,
      required: true
    },
    type: {
        type: String,
        default: 'personal'
    },
    date: {
        type: Date,
        default: Date.now
    },
    startdatetime : {
        type : Date,
        required : true
    },
    enddatetime: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('event', EventSchema);
