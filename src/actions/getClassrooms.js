const Student = require('../model/student');
const Invite = require('../model/invite');
const Classroom = require('../model/classroom');
const { assertTeacher } = require('../utils');

function getClassroom(user) {
    assertTeacher(user);

    return Classroom.find({ teacher: user._id })
        .lean()
        .map(classroom => {
            const query = { classroom: classroom._id };
            return all([Student.find(query).lean(), Invite.find(query).lean()])
                .spread((registered, invited) =>
                    merge(classroom, {
                        registered: pick(['email', 'name'], registered),
                        invited: pick(['email', 'sent'], invited) }));
        });
}

module.exports = getClassroom;
