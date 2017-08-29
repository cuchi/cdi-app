const { resolve } = require('bluebird');
const { map, pluck } = require('ramda');
const mongoose = require('mongoose');
const Student = require('../model/student');
const Teacher = require('../model/teacher');
const Classroom = require('../model/classroom');
const { assertTeacher } = require('../utils');

const ObjectId = mongoose.Types.ObjectId;

function deleteStudent(studentId, user) {
    assertTeacher(user);

    return resolve(Classroom.find({ teacher: user._id })
        .lean())
        .then(pluck('_id'))
        .then(ids =>
            Student.findOneAndRemove({
                _id: studentId,
                classroom: { $in: map(ObjectId, ids) } }))
        .then(when(isNil, () =>
            fail(new NotFoundError('Student does not exist!'))))
}

module.exports = deleteStudent;
