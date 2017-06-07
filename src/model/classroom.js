const mongoose = require('mongoose');
const R = require('ramda');
const { requiredString } = require('../db');

const Classroom = {
    name: requiredString
};

exports.default = mongoose.model('Classroom', Classroom);
