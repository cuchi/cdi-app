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
        saveUninitialized: false
    }));

    app.use([passport.initialize(), passport.session()]);

    app.use('/api', api.getRouter());

    app.listen(8080, () => {
        console.log('Listening on port 8080...');
    });

    return app;
}

module.exports = { run };
