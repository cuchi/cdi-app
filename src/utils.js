const { PermissionError } = require('./errors');

const fail = err => { throw err };

const isTeacher = user => user.model === 'Teacher';

function assertStudent(user) {
    if (isTeacher(user)) throw new PermissionError('Not a student!');
}

function assertTeacher(user) {
    if (!isTeacher(user)) throw new PermissionError('Not a teacher!');
}

module.exports = { fail, assertTeacher, assertStudent };
