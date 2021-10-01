'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('clients',{
      id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      fullname:{
        type:Sequelize.STRING,
        allowNull: false
      },
      gender:{
        type:Sequelize.ENUM('Masculino', 'Feminino', 'Outro', 'Prefiro não dizer'),
        allowNull: false
      },
      birthday:{
        type:Sequelize.DATE,
        allowNull: false
      },
      age:{
        type:Sequelize.INTEGER,
        allowNull: false
      },
      city:{
        type: Sequelize.INTEGER, 
        allowNull: false,
        references:{
          model: {
            tableName: 'cities'
          },
          key: 'id'
        }
      },
      createdAt:{
        type:Sequelize.DATE,
        allowNull: false
      },
      updatedAt:{
        type:Sequelize.DATE,
        allowNull: false
      },
      version:{
        type:Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('clients');
  }
};
