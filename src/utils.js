const { PermissionError } = require('./errors');
const crypto = require('crypto');

const fail = err => { throw err };

const isTeacher = user => user.model === 'Teacher';

function assertStudent(user) {
    if (isTeacher(user)) throw new PermissionError('Not a student!');
}

function assertTeacher(user) {
    if (!isTeacher(user)) throw new PermissionError('Not a teacher!');
}

function generateToken() {
    return crypto.randomBytes(32).toString('hex');
}

module.exports = { fail, assertTeacher, assertStudent, generateToken };
