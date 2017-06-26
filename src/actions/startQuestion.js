const { resolve } = require('bluebird');
const { isNil, when, curry, pick } = require('ramda');
const Question = require('../model/question');
const Answer = require('../model/answer');
const Student = require('../model/student');
const { assertStudent } = require('../utils');
const { NotFoundError } = require('../errors');

const startTimer = curry((studentId, question) => {
    return resolve(Answer
        .find({ student: studentId, question: question._id }))
        .then(when(isNil, () =>
            new Answer({
                student: studentId,
                question: question._id,
                startDate: Date.now() }).save()));
})

function startQuestion(user, questionId) {
    assertStudent(user);

    return resolve(Student.findById(user._id).lean())
        .then(student => Question
            .findOne({
                classrooms: student.classroom,
                _id: questionId })
            .lean())
        .then(when(isNil, () =>
            fail(new NotFoundError('This question does not exist!'))))
        .tap(startTimer)
        .then(pick(['_id', 'description', 'answers', 'limit', 'points']));
}

module.exports = startQuestion;
