module.exports = (sequelize, DataTypes) => {
    const Clients = sequelize.define('Clients',{
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
        }
      },
      {
        timestamps: true,
        version: true,
      }
      )
    return Clients
}