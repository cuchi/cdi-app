const mongoose = require('mongoose');
const R = require('ramda');
const { requiredString } = require('./utils');

const Question = {
    description: requiredString,
    isCorrect: Boolean
};

exports.default = mongoose.model('Question', Question);
