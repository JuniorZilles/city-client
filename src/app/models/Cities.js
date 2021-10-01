module.exports = (sequelize, DataTypes) => {
  const Cities = sequelize.define(
    'Cities',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: true,
      version: true,
    }
  )
  return Cities
}
