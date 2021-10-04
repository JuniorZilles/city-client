const { sequelize } = require('../../src/app/models')

// limpa as tabelas do banco, percorrendo cada model e removendo os dados
module.exports = {
  truncate: () => {
    return Promise.all(
      Object.keys(sequelize.models).map(key => {
        return sequelize.models[key].destroy({ truncate: { cascade: true }, force: true, restartIdentity: true  })
      })
    )
  },
  truncateOrdered: async () => {
    await sequelize.models['Clients'].destroy({ truncate: { cascade: true }, force: true, restartIdentity: true  })
    await sequelize.models['Cities'].destroy({ truncate: { cascade: true }, force: true, restartIdentity: true  })
  }
}
