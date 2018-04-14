module.exports = (sequelize, DataTypes) =>{
    const House = sequelize.define('house', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        location: DataTypes.STRING,
        rent: DataTypes.INTEGER,
        rooms: DataTypes.INTEGER
    })
    return House
}