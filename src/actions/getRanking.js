const Student = require('../model/student');
const Teacher = require('../model/teacher');
const Classroom = require('../model/classroom');

function getRankingForStudent(user) {
    return Student.aggregate([
        { $match: { classroom: user.classroom } },
        { $project: { name: true, code: true, score: true } },
        { $sort: { score: -1 } }]);
}

function getRankingForTeacher(user) {
    return Teacher.findById(user._id)
        .lean()
        .then(teacher => //aaaa)
}

function getRanking(user) {
    return user.model === 'Teacher'
        ? getRankingForTeacher(user)
        : getRankingForStudent(user);
}

module.exports = getRanking;
