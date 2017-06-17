const mongoose = require('mongoose');
const { requiredString } = require('../db');

const Classroom = {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom'
};

const Question = new mongoose.Schema({
    description: requiredString,
    date: {
        type: Date,
        default: Date.now
    },
    answers: {
        type: [String],
        required: true
    },
    correctAnswer: {
        type: Number,
        required: true
    },
    feedback: String,
    limit: Number,
    points: {
        type: Number,
        required: true
    },
    classrooms: {
        type: [Classroom],
        required: true
    }
});

module.exports = mongoose.model('Question', Question);
