
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.status = 404;
    }
}

class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
    }
}

module.exports = { NotFoundError, AuthenticationError };
