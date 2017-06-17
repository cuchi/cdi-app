const mongoose = require('mongoose');
const { requiredString } = require('../db');

const Teacher = new mongoose.Schema({
    name: requiredString,
    code: String,
    email: requiredString,
    password: requiredString,
    phone: String,
    gender: {
        type: String,
        enum: ['m', 'f', 'o']
    },
    birthDate: String,
});

const indexes = [
    [{ email: 1 }, { unique: true }]
];

module.exports = mongoose.model('Teacher', Teacher);
