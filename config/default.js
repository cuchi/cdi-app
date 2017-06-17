
module.exports = {
    port: 8080,
    mongodb: {
        url: 'mongodb://127.0.0.1:27017/cdi'
    },
    sendgrid: {
        key: process.env.SENDGRID_KEY,
        sender: 'cdiapp@udesc.br'
    }
};
