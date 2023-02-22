const Sequelize = require('sequelize')
const userModel = require("./user/index")

exports.db_config = new Sequelize('localhost','root','54321',{
    host:'localhost',
    dialect: 'mysql',
    logging:false,
    pool:{max:5,min:0,idle:10000}
});

exports.userModel = userModel(exports.db_config)
