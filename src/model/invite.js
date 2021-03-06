const mongoose = require('mongoose');
const { requiredString } = require('../db');

const Invite = new mongoose.Schema({
    token: requiredString,
    email: requiredString,
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true
    },
    sent: Date
});

module.exports = mongoose.model('Invite', Invite);
