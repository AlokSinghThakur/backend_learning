const express = require("express");
const ROUTES = express.Router();
const controller = require("../controllers/userController")

ROUTES.post('/signup',controller.signup)
ROUTES.post('/login',controller.login)

module.exports = ROUTES