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

exports.default = mongoose.model('Classroom', Classroom);
