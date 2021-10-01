class NotFound extends Error{
    constructor(nome){
        super(`${nome} não foi encontrado!`)
        this.name = 'NotFound'
        this.idError = 2
    }
}

module.exports = NotFound