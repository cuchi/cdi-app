const express = require('express');
const httpLogger = require('morgan');
const api = require('./api');

function run() {
    const app = express();

    app.use(httpLogger('dev'));

    app.use('/api', api.getRouter());

    app.listen(8080);

    return app;
}

module.exports = { run };
