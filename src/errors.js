const NotFound = require('./app/errors/NotFound')
const InvalidField = require('./app/errors/InvalidField')
const MissingArgument = require('./app/errors/MissingArgument')
const AlreadyCreated = require('./app/errors/AlreadyCreated')

module.exports = (error, req, res, next) =>{
    let status = 500
    if (error instanceof NotFound){
        status = 404
    }
    if (error instanceof InvalidField || error instanceof MissingArgument || error instanceof AlreadyCreated){
        status = 400
    }
    res.status(status).json({ message: error.message, id: error.idError })
}