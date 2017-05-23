const { Router } = require('express');
const createStudent = require('./actions/createStudent');
const login = require('./actions/login');

const send501 = (req, res) => res.status(501);

function getRouter() {
    const router = new Router();

    router.get('/status', (req, res) => {
        res.status(200).send('Everything is fine!');
    });

    router.post('/student/:token', (req, res, next) => {
        createStudent(req.params.token, req.body)
            .then(student => res.status(201).send(student))
            .catch(next);
    });

    router.post('/login', (req, res, next) => {
        login(req.body)
            .then(() => res.sendStatus(200))
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
