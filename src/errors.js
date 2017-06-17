
class HttpError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.status = statusCode;
    }
}

class NotFoundError extends HttpError {
    constructor(message) {
        super(message, 404);
        this.name = 'NotFoundError';
    }
}

class AuthenticationError extends HttpError {
    constructor(message) {
        super(message, 401);
        this.name = 'AuthenticationError';
    }
}

class PermissionError extends HttpError {
    constructor(message) {
        super(message, 403);
        this.name = 'PermissionError';
    }
}

class ValidationError extends HttpError {
    constructor(message) {
        super(message, 400);
        this.name = 'ValidationError';
    }
}

module.exports = {
    AuthenticationError,
    NotFoundError,
    PermissionError,
    ValidationError
};
