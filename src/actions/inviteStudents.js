const { all } = require('bluebird');
const { map } = require('ramda');
const Invite = require('../model/invite');
const Teacher = require('../model/teacher');
const { assertTeacher, generateToken } = require('../utils');
const sendEmail = require('../mail');
const { ValidationError } = require('../errors');

function sendInvite(invite, teacherName) {
    return sendEmail(
        invite.email,
        `${teacherName} está te convidando para usar o CDI-APP`,
        `
            Olá!

            Para criar sua conta, acesse o link
            https://cdi-app.herokuapp.com/newUser.html?token=${invite.token}
        `)
}

function createInvite(classroomId, email, teacherName) {
    const token = generateToken();
    const invite = { token, email, classroom: classroomId };
    return new Invite(invite)
        .save()
        .catchThrow(new ValidationError('Classroom does not exist!'))
        .tap(() => sendInvite(invite, teacherName))
        .then(({ _id }) =>
            Invite.update(
                { _id },
                { $set: { sent: new Date() } }));
}

function inviteStudents(classroomId, emails, user) {
    assertTeacher(user);

    return Teacher.findById(user._id)
        .then(teacher => all(map(
            email => createInvite(classroomId, email, teacher.name),
            emails)));
}

module.exports = inviteStudents;
