const mongoose = require('mongoose');
const { requiredString } = require('../db');

const Answer = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    startDate: Date,
    choice: Number,
});

const indexes = [
    [{ question: 1, student: 1 }, { unique: true }]
];

module.exports = mongoose.model('Answer', Answer);
