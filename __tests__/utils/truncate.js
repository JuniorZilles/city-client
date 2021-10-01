const { sequelize } = require('../../src/app/models')

// limpa as tabelas do banco, percorrendo cada model e removendo os dados 
module.exports = () => {
  return Promise.all(
    Object.keys(sequelize.models).map(key => {
      return sequelize.models[key].destroy({ truncate: true, force: true })
    })
  )
}
