const mongoose = require('mongoose');
const R = require('ramda');
const { requiredString } = require('../db');

const Answer = {
    description: requiredString,
    isCorrect: Boolean
};

const Question = new mongoose.Schema({
    title: requiredString,
    date: {
        type: Date,
        default: Date.now
    },
    answers: {
        type: [Answer],
        required: true
    },
    feedback: String,
    limit: Number,
    points: Number,
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom'
    }
});

exports.default = mongoose.model('Question', Question);
