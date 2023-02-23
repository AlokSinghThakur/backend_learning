const express = require("express");
const ROUTES = express.Router();
const userController = require("../controllers/users")
const followUserController = require("../controllers/followUser")
const citiesDataController = require("../controllers/citiesData")

ROUTES.post('/signup',userController.signup)
ROUTES.post('/login',userController.login)
ROUTES.post('/followUser',followUserController.followUser)
ROUTES.post('/unfollow',followUserController.unFollowUser)
ROUTES.get('/followersList',followUserController.followerList)
ROUTES.get('/followingList',followUserController.followingList)


ROUTES.post('/cities',citiesDataController.saveCitiesData)
ROUTES.get('/getCities',citiesDataController.getCityData)


module.exports = ROUTES