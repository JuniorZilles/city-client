class AlreadyCreated extends Error{
    constructor(field){
        super(`O registro '${field}' já existe na base de dados`)
        this.name = 'AlreadyCreated'
        this.idError = 3
    }
}

module.exports = AlreadyCreated