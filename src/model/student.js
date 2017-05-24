const mongoose = require('mongoose');
const { requiredString } = require('../db');

const Student = {
    name: requiredString,
    password: requiredString,
    code: requiredString,
    email: requiredString,
    phone: requiredString,
    score: {
        type: Number,
        default: 0
    }
}

exports.default = mongoose.model('Student', Student)
