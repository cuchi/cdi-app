const server = require('./src/server');
const db = require('./src/db');
const auth = require('./src/auth');

module.exports = db.connect()
    .then(() => auth.initialize())
    .then(() => server.run());
