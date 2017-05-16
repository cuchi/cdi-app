const mongoose = require('mongoose');
const R = require('ramda');
const { requiredString } = require('./utils');

const Question = {
    title: requiredString,
    date: {
        type: Date,
        default: Date.now
    },
    limit: Number
};

exports.default = mongoose.model('Question', Question);
