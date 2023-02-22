const userModule = require("../index").userModel

module.exports = {

    //data creation
    async saveUser(data){
        return await userModule.create(data);
    },

    //getting user detail using email
    async getUserEmail(email){
        return await userModule.findOne({where:{email : email}})
    }
}