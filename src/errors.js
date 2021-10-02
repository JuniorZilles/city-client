const NotFound = require('./app/errors/NotFound')
const InvalidField = require('./app/errors/InvalidField')
const MissingArgument = require('./app/errors/MissingArgument')

module.exports = (error, req, res, next) =>{
    let status = 500
    if (error instanceof NotFound){
        status = 404
    }
    if (error instanceof InvalidField){
        status = 400
    }
    if (error instanceof MissingArgument){
        status = 400
    }
    res.status(status).json({ message: error.message, id: error.idError })
}