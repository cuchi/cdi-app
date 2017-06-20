const mongoose = require('mongoose');
const R = require('ramda');
const { requiredString } = require('../db');

const Classroom = {
    name: requiredString,
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    }
};

const indexes = [
    [{ teacher: 1, name: 1 }, { unique: true }]
];

module.exports = mongoose.model('Classroom', Classroom);
