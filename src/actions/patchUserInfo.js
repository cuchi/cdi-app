const { pick } = require('ramda');
const Student = require('../model/student');
const teacher = require('../model/teacher');

function patchUserInfo(userInfo, user) {
    const model = user.model === 'Teacher'
        ? teache
        : Student;

    const values = pick(
        ['name', 'code', 'gender', 'birthdate', 'phone'],
        userInfo);

    return model.update({ _id: user._id }, { $set: values });
}

module.exports = patchUserInfo;
