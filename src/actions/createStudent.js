const { isNil, when } = require('ramda');
const Invite = require('../model/invite');
const Student = require('../model/student');
const { NotFoundError } = require('../errors');
const { fail } = require('../utils');
const { hashPassword } = require('../auth');

function createStudent(studentInfo) {
    return Invite.findOne({ token: studentInfo.token })
        .then(when(isNil, () => fail(new NotFoundError('Token not found!'))))
        .then(invite =>
            new Student({
                email: invite.email,
                password: hashPassword(studentInfo.password),
                name: studentInfo.name,
                classroom: invite.classroom
            }).save())
        .tapCatch(console.log);
}

module.exports = createStudent;
