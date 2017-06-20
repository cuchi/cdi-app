const sendgrid = require('sendgrid');
const { resolve } = require('bluebird');
const config = require('config');

const mailer = sendgrid(config.sendgrid.key);

function sendEmail(to, subject, content) {
    const request = mailer.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: {
            personalizations: [{
                to: [{ email: to }],
                subject
            }],
            from: {
                email: config.sendgrid.sender
            },
            content: [{
                type: 'text/plain',
                value: content
            }]
        }
    });

    return mailer.API(request)
        .catch(err => {
            console.log(err.message);
            throw err;
        });
}

module.exports = config.sendgrid.key
    ? sendEmail
    : () => resolve(); // Noop when the key is not set
