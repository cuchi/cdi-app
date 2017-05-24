const Student = require('../model/student');
const { checkPassword } = require('../auth');

function studentLogin(loginInfo) {
    Student.findOne({ email: loginInfo.email })
        .then(when(isNil, fail(new AuthenticationError())))
        .then(student => checkPassword(student, loginInfo));
}

module.exports = studentLogin;
