const Student = require('../model/student');
const { isTeacher } = require('../utils');
const { assertStudent } = require('../utils');

function getRanking(user) {
    assertStudent(user);

    return Student.aggregate([
        { $match: { classroom: currentStudent.classroom } },
        { $project: { name: true, code: true, score: true } },
        { $sort: { score: -1 } }]);
}

module.exports = getRanking;
