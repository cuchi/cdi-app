const mongoose = require('mongoose');
const { requiredString } = require('../db');

const Student = new mongoose.Schema({
    name: requiredString,
    password: requiredString,
    code: requiredString,
    email: requiredString,
    phone: requiredString,
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom'
    },
    score: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Student', Student)
