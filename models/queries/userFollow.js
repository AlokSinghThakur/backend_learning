const { Op } = require('sequelize');
const userFollowModule = require("../index").userFollowModel;
const userModule = require("../index").userModel
module.exports = {
    async saveUserFollow(data) {
        return await userFollowModule.create(data);
    },

    async isFollowed(user_id, following_id) {
        return await userFollowModule.findOne({
            where: {
                [Op.and]: [{ user_id: user_id }, { following_id: following_id }]
            }
        })
    },

    async updateFollow(id, action) {
        return await userFollowModule.update({ is_follow: action }, { where: { id: id } })
    },

    async getFollowersList(following_id) {
        return await userFollowModule.findAll({
            attributes:['user_id'],
            where: {
                [Op.and]: [{ following_id: following_id},{is_follow:true}]
            }
        }).then(userId =>{
            return userModule.findAll({
                attributes:['user_id','name','email'],
                where:{
                    user_id:{[Op.in]:(()=> userId.map(users => users.user_id))()}
                }
            })
        })
    },

    async getFollowingList(user_id) {
        return await userFollowModule.findAll({
            attributes:['following_id'],
            where: {
                [Op.and]: [{ user_id: user_id},{is_follow:true}]
            }
        }).then(userId =>{
            return userModule.findAll({
                attributes:['user_id','name','email'],
                where:{
                    user_id:{[Op.in]:(()=> userId.map(users => users.following_id))()}
                }
            })
        })
    }
}