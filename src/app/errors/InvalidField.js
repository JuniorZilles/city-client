class InvalidField extends Error{
    constructor(field){
        super(`O campo '${field}' está fora do formato padrão`)
        this.name = 'InvalidField'
        this.idError = 0
    }
}

module.exports = InvalidField