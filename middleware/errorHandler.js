const {StatusCodes} = require('http-status-codes')

const errorHandler = (err, req, res, next) => {

    const customError = {
        message: err.message || 'opps something went wrong',
        statuscode: err.statuscode || StatusCodes.INTERNAL_SERVER_ERROR
    }
    if(err.code && err.code === 11000){
        customError.message = `Duplicate value entered for ${Object.keys(
            err.keyValue
          )} field, please choose another value`
          customError.statusCode = 400
    }
    if(err.name === 'ValidationError'){
        customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
    customError.statusCode = 400
    }
    if(err.name ==='CastError'){
        customError.msg = `No item found with id : ${err.value}`
        customError.statusCode = 404
    }
    return res.status(customError.statuscode).json({messg: customError.message})

}

module.exports = errorHandler