const { merge, pick } = require('ramda');
const Teacher = require('../model/teacher');

module.exports = teacherInfo => {
    const teacher = merge(
        pick(['name', 'code', 'email', 'phone'], teacherInfo),
        { password: hashPassword(teacherInfo.password) });

    return new Teacher(teacher).save();
};
