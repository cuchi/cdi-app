const express = require('express');
const httpLogger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors')
const api = require('./api');
const config = require('config');

function run() {
    const app = express();

    app.use(httpLogger('dev'));

    app.use(cors());

    app.use(bodyParser.json());

    app.use(session({ 
        secret: 'secret',
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 61516800000
        }
    }));

    app.use([passport.initialize(), passport.session()]);

    app.use('/api', api.getRouter());

    app.use('/', express.static('public'));

    // Error handling
    app.use((err, req, res, next) => {
        if (err && err.status) {
            res.sendStatus(err.status);
        }
        next(err);
    });

    app.listen(config.port, () => {
        console.log(`Listening on port ${config.port}...`);
    });

    return app;
}

module.exports = { run };
