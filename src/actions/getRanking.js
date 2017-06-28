const mongoose = require('mongoose');
const { map, pipe, prop } = require('ramda');
const Student = require('../model/student');
const Teacher = require('../model/teacher');
const Classroom = require('../model/classroom');

const ObjectId = mongoose.Types.ObjectId;

function getRankingForStudent(user) {
    return Student.aggregate([
        { $match: { classroom: user.classroom } },
        { $project: { name: true, code: true, score: true } },
        { $sort: { score: -1 } }]);
}

function getRankingForTeacher(user) {
    return resolve(Teacher.findById(user._id)
        .lean())
        .then(teacher =>
            Classroom.find({ teacher: user._id }).lean())
        .then(classrooms => Student.aggregate([
            { $match: { classroom: {
                $in: map(
                    pipe(prop('_id'), ObjectId),
                    classrooms) } } },
            { $project: { name: true, code: true, score: true } },
            { $sort: { score: -1 } }]))
}

function getRanking(user) {
    return user.model === 'Teacher'
        ? getRankingForTeacher(user)
        : getRankingForStudent(user);
}

module.exports = getRanking;
