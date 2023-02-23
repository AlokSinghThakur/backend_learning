const userFollowQueries = require("../../models/queries/userFollow")

module.exports = {
    async followUser(req, res) {
        let userId = req.body.userId;
        let followingId = req.body.followingId;
        let isFollow = req.body.isfollow

        if (userId == followingId) {
            return res.status(422).send({ code: 422, msg: "something went wrong" })
        }

        try {
            let isFollowed = await userFollowQueries.isFollowed(userId, followingId)

            if (!isFollowed) {
                let data = {
                    user_id: userId,
                    following_id: followingId,
                    is_follow: isFollow
                }
                await userFollowQueries.saveUserFollow(data)

                return res.status(200).json({ code: 200, msg: "Followed successfully" })
            } else if (isFollowed.is_follow == false) {

                await userFollowQueries.updateFollow(isFollowed.id, true);

                return res.status(200).json({ code: 200, msg: "Followed successfully" })
            }
            else {
                return res.status(422).send({ code: 422, msg: "already following" })
            }
        } catch (err) {
            console.log("error : ", err);
            return res.status(422).send({ code: 422, status: 'failed', msg: err.message });
        }
    }
    , async unFollowUser(req, res) {
        let userId = req.body.userId;
        let followingId = req.body.followingId;
        try {
            let isFollowed = await userFollowQueries.isFollowed(userId, followingId);
            if (isFollowed.is_follow == true) {
                await userFollowQueries.updateFollow(isFollowed.id, false);
                return res.status(200).send({ code: 200, status: "success", msg: "unfollowed successfully" })
            } else {
                return res.status(422).send({ code: 422, status: 'failed', msg: 'already unfollowed' });
            }
        } catch (err) {
            console.log("error : ", err);
            return res.status(422).send({ code: 422, status: 'failed', msg: err.message });
        }

    }
    , async followerList(req, res) {
        let followingId = req.body.followingId;
        if(!followingId) return res.status(422).send({code:422,status:'failed',msg:"Data is required"})

        try {
            let followersList = await userFollowQueries.getFollowersList(followingId)
            return res.status(200).send({ code: 200, status: 'success', data: followersList });

        } catch (err) {
            console.log("error in followers list", err);
            return res.status(422).send({ code: 422, status: 'failed', msg: err.message })
        }

    },
    async followingList(req, res) {
        let userId = req.body.userId;
        if(!userId) return res.status(422).send({code:422,status:'failed',msg:"Data is required"})

        try {
            let followingList = await userFollowQueries.getFollowingList(userId)
            return res.status(200).send({ code: 200, status: 'success', data: followingList });


        } catch (err) {
            console.log("error in following list", err);
            return res.status(422).send({ code: 422, status: 'failed', msg: err.message })

        }
    }
}