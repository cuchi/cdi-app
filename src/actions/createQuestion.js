const { pipe, pick, tap, evolve, merge } = require('ramda');
const { all, resolve } = require('bluebird');
const Question = require('../model/question');
const Classroom = require('../model/classroom');
const { assertTeacher } = require('../utils');
const { ValidationError } = require('../errors');

function validate(question) {
    if (question.correctAnswer >= question.answers.length) {
        throw new ValidationError('Correct answer is out of bounds!');
    }

    if (question.classrooms.length === 0) {
        throw new ValidationError('Empty classroom list!');
    }
    return question;
}

function save(question) {
    console.log(question)
    return new Question(question).save();
}

function notifyUsers(question) {
    return all([]); // TODO
}

function createQuestion(questionInfo, user) {
    assertTeacher(user);

    const saveQuestion = pipe(
        pick([
            'description',
            'answers',
            'correctAnswer',
            'positiveFeedback',
            'negativeFeedback',
            'limit',
            'points',
            'classrooms']),
        evolve({
            limit: Number,
            points: Number }),
        validate,
        merge({ teacher: user._id }),
        tap(save),
        notifyUsers)

    return saveQuestion(questionInfo);
}

module.exports = createQuestion;
