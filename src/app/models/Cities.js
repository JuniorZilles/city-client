module.exports = (sequelize, DataTypes) => {
    const Cities = sequelize.define('cities',{
        id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        state: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        version: DataTypes.INTEGER
    })
    return Cities
}