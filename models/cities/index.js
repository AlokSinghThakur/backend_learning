const { DataTypes } = require('sequelize');

module.exports = (db_config) => {
    const cities_data = db_config.define('cities_data', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name_en: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        name_hi: {
            type: DataTypes.STRING,
            allowNull: false
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        isSelected: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }

    })
    return cities_data;
}