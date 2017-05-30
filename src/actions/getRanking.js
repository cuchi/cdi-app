const Student = require('../model/student');

module.exports = currentStudent => {
    return Student.aggregate([
        { $match: { classroom: currentStudent.classroom } }]);
};