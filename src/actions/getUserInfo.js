const { pick, assoc } = require('ramda');
const Student = require('../model/student');
const Teacher = require('../model/teacher');

function getUserInfo(user) {
    const model = user.model === 'Teacher'
        ? Teacher
        : Student;

    return model.findById(user._id)
        .lean()
        .then(pick(['_id', 'name', 'phone', 'code',
            'gender', 'email', 'score']))
        .then(assoc('model', user.model));
}

module.exports = getUserInfo;
