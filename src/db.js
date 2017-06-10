const mongoose = require('mongoose');
const Bluebird = require('bluebird');
const config = require('config');

const requiredString = {
    type: String,
    required: true
};

function connect() {
    const { url } = config.mongodb;

    mongoose.Promise = Bluebird;

    return mongoose.connect(url)
        .then(() => console.log(`Connected successfuly to ${url}`))
        .catch(err => {
            console.error(`Failed to connect to ${url}`);
            throw err;
        });
}

module.exports = { 
    connect,
    requiredString
};
