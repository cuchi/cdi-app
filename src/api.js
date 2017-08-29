const { Router } = require('express');
const passport = require('passport');
const { enforceAuthentication } = require('./auth');
const createStudent = require('./actions/createStudent');
const getStudentToken = require('./actions/getStudentToken');
const getUserInfo = require('./actions/getUserInfo');
const patchUserInfo = require('./actions/patchUserInfo');
const getClassrooms = require('./actions/getClassrooms');
const getQuestions = require('./actions/getQuestions');
const startQuestion = require('./actions/startQuestion');
const answerQuestion = require('./actions/answerQuestion');
const createTeacher = require('./actions/createTeacher');
const createClassroom = require('./actions/createClassroom');
const createQuestion = require('./actions/createQuestion');
const inviteStudent = require('./actions/inviteStudent');
const deleteStudent = require('./actions/deleteStudent');
const deleteInvite = require('./actions/deleteInvite');
const getRanking = require('./actions/getRanking');

const send501 = (req, res) => res.sendStatus(501);

function getRouter() {
    const router = new Router();

    router.get('/status', (req, res) => {
        res.status(200).json({ message: 'It works!' });
    });

    router.post('/teacher/session', [
        passport.authenticate('local-teacher'),
        (req, res) => res.sendStatus(200)
    ]);

    router.post('/student/session', [
        passport.authenticate('local-student'),
        (req, res) => res.sendStatus(200)
    ]);

    router.post('/teacher', (req, res, next) => {
        createTeacher(req.body)
            .then(teacher => res.status(201).json(teacher))
            .catch(next);
    });

    router.post('/student', (req, res, next) => {
        createStudent(req.body)
            .then(student => res.status(201).json(student))
            .catch(next);
    });

    router.get('/student/token/:token', (req, res, next) => {
        getStudentToken(req.params.token)
            .then(token => res.status(200).json(token))
            .catch(next);
    });

    router.use(enforceAuthentication);

    router.delete('/session', (req, res) => {
        req.logout();
        req.session.destroy();
        res.sendStatus(200);
    });

    router.put('/classroom/:classroomId/invitations', (req, res, next) => {
        inviteStudent(req.params.classroomId, req.body, req.user)
            .then(invitation => res.status(201).json(invitation))
            .catch(next);
    });

    router.post('/classroom', (req, res, next) => {
        createClassroom(req.body, req.user)
            .then(classroom => res.status(201).json(classroom))
            .catch(next);
    });

    router.get('/questions', (req, res, next) => {
        getQuestions(req.user)
            .then(questions => res.status(200).json(questions))
            .catch(next);
    })

    router.put('/questions/:questionId/timer', (req, res, next) => {
        startQuestion(req.user, req.params.questionId)
            .then(questionInfo => res.status(200).send(questionInfo))
            .catch(next);
    });

    router.post('/questions/:questionId/answer', (req, res, next) => {
        answerQuestion(req.user, req.params.questionId, req.body)
            .then(feedback => res.status(201).send(feedback))
            .catch(next);
    });

    router.post('/question', (req, res, next) => {
        createQuestion(req.body, req.user)
            .then(question => res.status(201).json(question))
            .catch(next);
    })

    router.get('/me', (req, res, next) => {
        getUserInfo(req.user)
            .then(user => res.status(200).json(user))
            .catch(next);
    });

    router.patch('/me', (req, res, next) => {
        patchUserInfo(req.body, req.user)
            .then(() => res.sendStatus(200))
            .catch(next);
    });

    router.get('/classrooms', (req, res, next) => {
        getClassrooms(req.user)
            .then(classrooms => {
                res.status(200).json(classrooms)
            })
            .catch(next);
    });

    router.get('/ranking', (req, res, next) => {
        getRanking(req.user)
            .then(ranking => res.status(200).json(ranking))
            .catch(next);
    });

    router.delete('/students/:studentId', (req, res, next) => {
        deleteStudent(req.params.studentId, req.user)
            .then(() => res.sendStatus(200))
            .catch(next);
    });

    router.delete('/invites/:token', (req, res, next) => {
        deleteInvite(req.params.token, req.user)
            .then(() => res.sendStatus(200))
            .catch(next);
    });

    return router;
}

module.exports = { getRouter };
