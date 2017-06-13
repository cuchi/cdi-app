
class HttpError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.status = statusCode;
    }
}

class NotFoundError extends HttpError {
    constructor(message) {
        super(message, 404);
    }
}

class AuthenticationError extends HttpError {
    constructor(message) {
        super(message, 401);
    }
}

class PermissionError extends HttpError {
    constructor(message) {
        super(message, 403);
    }
}

module.exports = { NotFoundError, AuthenticationError, PermissionError };
