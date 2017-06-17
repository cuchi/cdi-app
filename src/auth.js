const crypto = require('crypto');
const passport = require('passport');
const { isNil, merge, when } = require('ramda');
const LocalStrategy = require('passport-local').Strategy;
const Student = require('./model/student');
const Teacher = require('./model/teacher');
const { AuthenticationError } = require('./errors');
const { fail } = require('./utils');

function randomSalt() {
    return crypto.randomBytes(16).toString('base64');
}

function hash(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 10, 256, 'sha256')
        .toString('base64');
}

function hashPassword(plainPassword) {
    const salt = randomSalt();
    return `${salt}%${hash(plainPassword, salt)}`;
}

function verifyPassword(fullPassword, plain) {
    const [salt, hashed] = fullPassword.split('%');
    return hashed === hash(plain, salt);
}

function authenticateModel(model) {
    return (email, password, done) => {
        model.findOne({ email })
            .then(when(isNil, () => done(new AuthenticationError())))
            .then(user =>
                verifyPassword(user.password, password)
                    ? done(null, user)
                    : done(new AuthenticationError()));
    }
}

const defaultStrategy = model =>
    new LocalStrategy(
        { usernameField: 'email' },
        authenticateModel(model));

function initialize() {
    passport.use('local-student', defaultStrategy(Student));

    passport.use('local-teacher', defaultStrategy(Teacher));

    passport.serializeUser((user, done) => {
        done(null, { _id: user._id, model: user.constructor.modelName });
    });

    passport.deserializeUser((user, done) => {
        const model = user.model === 'Teacher'
            ? Teacher
            : Student;

        model.findById(user._id).lean()
            .then(merge(user))
            .then(user => done(null, user));
    });
}

function enforceAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user) {
            return next();
        }
        req.logout();
        req.session.destroy();
    }
    next(new AuthenticationError());
}

module.exports = {
    initialize,
    hashPassword,
    verifyPassword,
    enforceAuthentication
};
