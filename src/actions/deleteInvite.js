const { isNil, when } = require('ramda');
const Invite = require('../model/invite');
const { NotFoundError } = require('../errors');

function deleteInvite(token) {
    return Invite.findOneAndRemove({ token })
        .then(when(isNil, () =>
            fail(new NotFoundError('Invite does not exist!'))));
}

module.exports = deleteInvite;
