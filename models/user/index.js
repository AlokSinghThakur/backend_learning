const {DataTypes} = require('sequelize');

module.exports = (db_config) => {
    const user = db_config.define('users', {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        password: {type: DataTypes.STRING}
    });
    return user;
}