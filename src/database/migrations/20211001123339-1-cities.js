'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('cities',{
      id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name:{
        type:Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      state:{
        type:Sequelize.STRING,
        allowNull: false
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
    return queryInterface.dropTable('cities');
  }
};
