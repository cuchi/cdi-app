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
            return all([
                Student.find(query)
                    .sort({ name: 1 })
                    .lean(),
                Invite.find(query)
                    .sort({ email: 1 })
                    .lean()])
                .spread((registered, invited) =>
                    merge(classroom, {
                        registered: pick(
                            ['_id', 'email', 'name', 'score', 'phone', 'code'],
                            registered),
                        invited: pick(
                            ['_id', 'email', 'sent'],
                            invited) }));
        });
}

module.exports = getClassroom;
