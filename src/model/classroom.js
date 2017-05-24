const mongoose = require('mongoose');
const R = require('ramda');
const { requiredString } = require('../db');

const Classroom = {
    code: requiredString,
    semester: {
        type: String,
        validate: R.test(/\d{4}\/[1|2]/),
        required: true
    }
};

exports.default = mongoose.model('Classroom', Classroom);
