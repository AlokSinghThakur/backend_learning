const Sequelize = require('sequelize')
const userModel = require("./user/index")
const userFollowModel = require('./usersFollow/index');
const citiesDataModel = require("./cities");

exports.db_config = new Sequelize('localhost','root','54321',{
    host:'localhost',
    dialect: 'mysql',
    logging:false,
    pool:{max:5,min:0,idle:10000}
});

exports.userModel = userModel(exports.db_config);
exports.userFollowModel = userFollowModel(exports.db_config);
exports.citiesDataModel = citiesDataModel(exports.db_config);