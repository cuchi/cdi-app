const { Router } = require('express');

const send501 = (req, res) => res.status(501);

function getRouter() {
    const router = new Router();

    router.get('/status', (req, res) => {
        res.status(200).send('Everything is fine!');
    });

    router.post('/signIn', send501);

    router.post('/login', send501);

    router.get('/me', send501);

    router.get('/classRoom', send501);

    router.get('/ranking', send501);

    return router;
}

module.exports = { getRouter };
