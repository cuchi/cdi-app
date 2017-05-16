const mongoose = require('mongoose');
const { requiredString } = require('./utils');

const Teacher = {
    name: requiredString,
    code: String,
    email: requiredString,
    phone: requiredString
};

exports.default = mongoose.model('Teacher', Teacher);
