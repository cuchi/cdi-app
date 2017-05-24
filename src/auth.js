const crypto = require('crypto');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Student = require('./model/student');
const { AuthenticationError } = require('./errors');

function randomSalt() {
    return crypto.randomBytes(16).toString('base64');
}

function hash(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 10, 256, 'sha256');
}

function hashPassword(plainPassword) {
    const salt = randomSalt();
    const hash = hash(plainPassword, salt);
    return `${salt}%${hash}`;
}

function verifyPassword(hashed, plain) {
    const [salt] = hashed.split('%');
    return hashed === hash(plain, salt);
}

function authenticateModel(Model) {
    return (email, password, done) => {
        model.findOne({ email })
            .then(when(isNil, fail(new AuthenticationError())))
            .then(user =>
                verifyPassword(user.password, password)
                    ? done(null, user)
                    : done(new AuthenticationError()));
    }
}

function initialize() {
    passport.use('local-student', new LocalStrategy(
        { usernameField: 'email' },
        authenticateModel(Student)));

    passport.use('local-teacher', new LocalStrategy(
        { usernameField: 'email' },
        authenticateModel(Teacher)));
    
    passport.serializeUser((user, done) => {
        
    });

    passport.deserializeUser((userId, done) => {

    });
}

module.exports = {
    initialize,
    hashPassword,
    verifyPassword
};