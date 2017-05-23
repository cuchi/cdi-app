const mongoose = require('mongoose');
const Bluebird = require('Bluebird');
const { db } = require('config');

const requiredString = {
    type: String,
    required: true
};

function connect() {
    mongoose.PromiseProvider = Bluebird;

    const url = `mongodb://127.0.0.1:27017/${db.name}`;

    mongoose.connect(url)
        .then(() => console.log(`Connected successfuly to ${url}`))
        .catch(() => console.error(`Failed to connect to ${url}`));
}

module.exports = { 
    connect,
    requiredString
};
