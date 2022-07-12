const BadRequestError = require('./BadRequestError')
const CustomAPIError = require('./customError')
const NotFoundError = require('./NotFoundErrors')
const UnauthenticatedError = require('./UnauthenticatedError')


module.exports = {
    BadRequestError,
    CustomAPIError,
    NotFoundError,
    UnauthenticatedError
}