const express = require("express");
const ROUTES = express.Router();
const userController = require("../controllers/users")
const followUserController = require("../controllers/followUser")

ROUTES.post('/signup',userController.signup)
ROUTES.post('/login',userController.login)
ROUTES.post('/followUser',followUserController.followUser)
ROUTES.post('/unfollow',followUserController.unFollowUser)
ROUTES.get('/followersList',followUserController.followerList)
ROUTES.get('/followingList',followUserController.followingList)


module.exports = ROUTES