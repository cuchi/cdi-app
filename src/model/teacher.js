const mongoose = require('mongoose');
const { requiredString } = require('../db');

const Teacher = new mongoose.Schema({
    name: requiredString,
    code: String,
    email: requiredString,
    password: requiredString,
    phone: requiredString
});

exports.default = mongoose.model('Teacher', Teacher);
