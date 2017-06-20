const { Router } = require('express');
const passport = require('passport');
const { enforceAuthentication } = require('./auth');
const createStudent = require('./actions/createStudent');
const getStudentToken = require('./actions/getStudentToken');
const getUserInfo = require('./actions/getUserInfo');
const patchUserInfo = require('./actions/patchUserInfo');
const getClassrooms = require('./actions/getClassrooms');
const createTeacher = require('./actions/createTeacher');
const createClassroom = require('./actions/createClassroom');
const inviteStudent = require('./actions/inviteStudent');
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

    router.post('/question/:questionId', send501);

    return router;
}

module.exports = { getRouter };
