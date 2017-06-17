const Classroom = require('../model/classroom');
const { assertTeacher } = require('../utils');

function getClassroom(user) {
    assertTeacher(user);

    return Classroom.find({ teacher: user._id });
}

module.exports = getClassroom;
