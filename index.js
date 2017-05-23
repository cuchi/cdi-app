const server = require('./src/server');
const db = require('./src/db');

db.connect().then(() => server.run());
