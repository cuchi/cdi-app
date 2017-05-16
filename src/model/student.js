const mongoose = require('mongoose');
const { requiredString } = require('./utils');

const Student = {
    name: requiredString,
    code: requiredString,
    email: requiredString,
    phone: requiredString
}

exports.default = mongoose.model('Student', Student)
