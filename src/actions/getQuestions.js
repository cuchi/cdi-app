const { all, resolve } = require('bluebird');
const moment = require('moment');
const Question = require('../model/question');
const Student = require('../model/student');
const Answer = require('../model/answer');

function getQuestionsForTeacher(teacherId) {
    return Question.find({ teacher: teacherId });
}

function limitExceeded(question, answer) {
    if (answer && answer.startDate) {
        return moment().diff(moment(answer.startDate), 'minutes')
            >= question.limit;
    }
    return false;
}

function isDone(answer) {
    return answer && answer.choice;
}

function getQuestionsForStudent(studentId) {
    return resolve(Student.findById(studentId))
        .then(student =>
            Question.find({ classrooms: student.classroom }).lean())
        .map(question => {
            const query = { student: studentId, question: question._id };
            return all([question, Answer.findOne(query)])
                .spread((question, answer) => {
                    if (limitExceeded(question, answer) || isDone(answer)) {
                        return null;
                    }

                    return {
                        _id: question._id,
                        points: question.points,
                        limit: question.limit,
                        startDate: answer
                            ? answer.startDate
                            : undefined,
                    };
                });
        });
}

function getQuestions(user) {
    return user.model === 'Teacher'
        ? getQuestionsForTeacher(user._id)
        : getQuestionsForStudent(user._id);
}

module.exports = getQuestions;
