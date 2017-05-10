const express = require('express');
const httpLogger = require('morgan');

function run() {
    const app = express();

    app.use(httpLogger('dev'));

    app.listen(8080);

    return app;
}

module.exports = { run };
