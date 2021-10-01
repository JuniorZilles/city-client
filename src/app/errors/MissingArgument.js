class MissingArgument extends Error{
    constructor(field){
        super(`O argumento requisitado '${field}' não foi encontrado`)
        this.name = 'MissingArgument'
        this.idError = 1
    }
}

module.exports = MissingArgument