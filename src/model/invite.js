const mongoose = require('mongoose');
const { requiredString } = require('./utils');

const Invite = new mongoose.Schema({
    token: requiredString,
    email: requiredString,
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom'
    }
});

module.exports = mongoose.model('Invite', Invite)
