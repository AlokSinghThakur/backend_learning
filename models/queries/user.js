const userModule = require("../index").userModel

module.exports = {

    //data creation
    async saveUser(data) {
        return await userModule.create(data);
    },

    //getting user detail using email
    async getUserEmail(email) {
        return await userModule.findOne({ where: { email: email } })
    },

    //getting user detail using number
    async getUserNumber(number) {
        return await userModule.findOne({ where: { mobileno: number } })
    },

    //getting user password
    async getUserPassword(password) {
        return await userModule.findOne({ where: { passwordconst: password } })
    },

    //getting user By id
    async getUserById(id) {
        return await userModule.findOne({ where: { user_id: id } })

    },

    //editProfile
    async editProfile(id, data) {
        return await userModule.update(data, {
            where: { user_id: id }
        });
    }
}