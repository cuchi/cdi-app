const Classroom = require('../model/classroom');
const { assertTeacher } = require('../utils');

function createClassroom(classroom, user) {
    assertTeacher(user);

    const classroomObj = {
        name: classroom.name,
        teacher: teacher._id
    };

    return new Classroom(classroomObj).save().then(pick(['_id']));
}

module.exports = createClassroom;
