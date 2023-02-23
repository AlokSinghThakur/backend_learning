const {DataTypes} = require('sequelize');

module.exports = (db_config) =>{
    const user_follow = db_config.define('user_follow',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement:true        
            },
            user_id:{
                type:DataTypes.INTEGER,
                allowNull:false
            },
            following_id:{
                type:DataTypes.INTEGER,
                allowNull:false
            },
            is_follow: {
                type:DataTypes.BOOLEAN,
                defaultValue: true
            },
        },{
            tableName: 'user_follow'
        }
    )
    return user_follow;
}