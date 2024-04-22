const config = require("../config/config");
const httpStatus = require('http-status')

// Send response on errors
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        ...(config.env === "development" && { stack: (err.stack.length > 35 ? err.stack.substring(0, 77) + "...": err.stack) }),
    };

    if (config.env === "development") {
        console.error(err);
    }

    res.status(statusCode || httpStatus.INTERNAL_SERVER_ERROR).send(response);
};

module.exports = {
    errorHandler,
};