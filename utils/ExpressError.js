class ExpressError extends Error {
    constructor(message, statusCode) {
        //super() constructor calls the error constructor
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;