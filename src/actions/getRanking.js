const Student = require('../model/student');
const { isTeacher } = require('../utils');
const { PermissionError } = require('..errors');

function getRanking(user) {
    if (isTeacher(user)) throw new PermissionError('Not a student!');

    return Student.aggregate([
        { $match: { classroom: currentStudent.classroom } },
        { $project: { name: true, code: true, score: true } },
        { $sort: { score: -1 } }]);
}

module.exports = getRanking;
