const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")

const secretKey = process.env.JWT_SECRET;

const userQueries = require("../models/queries/user")

module.exports = {
    async signup(req, res) {
        const email = req.body.email
        const name = req.body.name
        try {
            let userExist = await userQueries.getUserEmail(email);
            console.log(email)
            if (userExist && userExist != null) {
                console.log(email)
                return res.status(422).send({ code: 422, status: "failed", msg: "email already exist" })
            }
            console.log('first')
            if (!userExist) {
                let data = {
                    email: email,
                    name: name
                }
                await userQueries.saveUser(data)
            }
            res.status(200).json({ code: 200, status: "success", msg: "user created Successfully" })

        } catch (err) {
            console.log('error : ', err)
        }
    },
    async login(req, res) {
        console.log(secretKey)
        const email = req.body.email
        const name = req.body.name
        try {
            let userExist = await userQueries.getUserEmail(email);
            if (userExist && userExist != null) {
                var token = jwt.sign({
                    email: userExist.email,
                }, secretKey)
                return res.status(200).send({ status: 'success', token: token })

            } else {
                console.log("email is invalid")
            }
        } catch (err) {
            console.log("error : ", err)
        }

    }
}