const { Router } = require('express');
const passport = require('passport');
const createStudent = require('./actions/createStudent');
const createTeacher = require('./actions/createTeacher');
const getRanking = require('./actions/getRanking');

const send501 = (req, res) => res.status(501);

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
            .then(teacher => res.status(201).send(teacher))
            .catch(next);
    });

    router.post('/student/:token', (req, res, next) => {
        createStudent(req.params.token, req.body)
            .then(student => res.status(201).send(student))
            .catch(next);
    });

    router.put('/classroom/:classroomId/invitations', (req, res, next) => {
        inviteStudents(req.params.classroomId, req.body, req.user)
            .then(invitations => res.status(201).json(invitations))
    });

    router.post('/classroom', (req, res, next) => {
        createClassroom(req.body, req.user)
            .then(classroom => res.status(201).json(classroom))
            .catch(next);
    });

    router.get('/me', send501);

    router.get('/classroom', send501);

    router.get('/ranking', (req, res, next) => {
        getRanking(req.user)
            .then(ranking => res.status(200).send(ranking))
            .catch(next);
    });

    router.post('/question/:questionId', send501);

    return router;
}

module.exports = { getRouter };
