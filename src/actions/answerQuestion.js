const { all, resolve } = require('bluebird');
const { isNil, when, propOr } = require('ramda');
const moment = require('moment');
const Question = require('../model/question');
const Answer = require('../model/answer');
const Student = require('../model/student');
const { assertStudent, fail } = require('../utils');
const { NotFoundError } = require('../errors');

function incScore(studentId, points) {
    return Student.update({ _id: studentId }, { $inc: { score: points } });
}

function answerQuestion(user, questionId, { answer: choice }) {
    assertStudent(user);

    const query = {
        question: questionId,
        student: user._id,
        choice: null
    };

    return resolve(Answer.findOne(query))
        .then(when(isNil, () =>
            fail(new NotFoundError('This answer does not exist!'))))
        .then(answer => all([answer, Question.findById(questionId)]))
        .tap(([question, answer]) => {
            if (moment().diff(moment(answer.startDate)) >= question.limit) {
                throw new ValidationError('Time limit exceeded!');
            }
        })
        .spread((answer, question) => resolve(
            Number(choice) === question.correctAnswer
                ? { successful: true, message: question.positiveFeedback }
                : { successful: false, message: question.negativeFeedback })
            .tap(() => Answer.update(query, { $set: { choice } }))
            .tap(feedback => feedback.successful
                ? incScore(user._id, question.points)
                : resolve()));
}

module.exports = answerQuestion;
