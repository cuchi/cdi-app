const request = require('supertest')
require('../index');

const agent = request.agent('http://127.0.0.1:8080');
const loggedAgent = null; //request.agent(server);

const testCase = caseName =>
    () => require(`./cases/${caseName}`)
        ({ agent, loggedAgent });

before(() => {
    // TODO: populate db with initial data & setup logged agent
});

const noop = () => {};

describe('Status', testCase('status'));
describe('Create Teacher', noop);
describe('Authentication', noop);
describe('Invite Student', noop);
