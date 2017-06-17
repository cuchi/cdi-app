const { isNil, when } = require('ramda');
const Invite = require('../model/invite');
const { fail } = require('../utils');
const { NotFoundError } = require('../errors');

function getStudentToken(token) {
    return Invite.findOne({ token })
        .then(when(isNil, () => fail(new NotFoundError('Token not found!'))));
}

module.exports = getStudentToken;
