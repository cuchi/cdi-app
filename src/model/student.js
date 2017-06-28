const mongoose = require('mongoose');
const { requiredString } = require('../db');

const Student = new mongoose.Schema({
    name: requiredString,
    password: requiredString,
    code: String,
    email: requiredString,
    phone: String,
    gender: {
        type: String,
        enum: ['m', 'f', 'o']
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    money: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Student', Student)
