const { resolve } = require('bluebird');
const { isNil, when, propOr } = require('ramda');
const Question = require('../model/question');
const Answer = require('../model/answer');
const Student = require('../model/student');
const { assertStudent } = require('../utils');
const { NotFoundError } = require('../errors');

function incScore(studentId, points) {
    return Student.update({ _id: studentId }, { $inc: { score: points } });
}

function answerQuestion(user, questionId, { choice }) {
    assertStudent(user);

    const query = { question: questionId, student: user._id };

    return resolve(Answer.findOne(query))
        .then(when(isNil, () =>
            fail(new NotFoundError('This answer does not exist!'))))
        .then(answer => all([answer, Question.findById(questionId)]))
        .spread((answer, question) => resolve(
            Number(choice) === question.correctAnswer
                ? { successful: true, message: question.positiveFeedback }
                : { successful: false, message: question.negativeFeedback })
            .tap(feedback => feedback.successful && answer.choice == null
                ? incScore(user._id, question.points)
                : resolve()));
}

module.exports = answerQuestion;
