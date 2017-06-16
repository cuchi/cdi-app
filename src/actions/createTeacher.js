const { merge, pick } = require('ramda');
const Teacher = require('../model/teacher');
const { hashPassword } = require('../auth');

module.exports = teacherInfo => {
    const teacher = merge(
        pick(['name', 'code', 'email', 'phone'], teacherInfo),
        { password: hashPassword(teacherInfo.password) });

    return new Teacher(teacher).save().then(pick(['_id']));
};
