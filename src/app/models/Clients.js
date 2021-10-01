module.exports = (sequelize, DataTypes) => {
    const Clients = sequelize.define('clients',{
        id:{
          type:DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        fullname:{
          type:DataTypes.STRING,
          allowNull: false
        },
        gender:{
          type:DataTypes.ENUM('Masculino', 'Feminino', 'Outro', 'Prefiro não dizer'),
          allowNull: false
        },
        birthday:{
          type:DataTypes.DATE,
          allowNull: false
        },
        age:{
          type:DataTypes.INTEGER,
          allowNull: false
        },
        city:{
          type: DataTypes.INTEGER, 
          allowNull: false,
          references:{
            model: {
              tableName: 'cities'
            },
            key: 'id'
          }
        },
        createdAt:{
          type:DataTypes.DATE,
          allowNull: false
        },
        updatedAt:{
          type:DataTypes.DATE,
          allowNull: false
        },
        version:{
          type:DataTypes.INTEGER,
          allowNull: false
        }
      })
    return Clients
}