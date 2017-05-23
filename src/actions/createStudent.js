const Invite = require('../model/invite');
const Student = require('../model/student');
const { NotFoundError } = require('../errors');
const { fail } = require('../utils');
const { hashPassword } = require('../auth');

function createStudent(inviteToken, studentInfo) {
    return Invite.findOne({ token })
        .then(when(isNil, fail(new NotFoundError())))
        .then(invite =>
            new Student({
                email: invite.email,
                password: hashPassword(studentInfo.password),
                name: studentInfo.name,
                phone: studentInfo.phone
            }).save());
}

module.exports = createStudent;
