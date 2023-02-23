const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")

const secretKey = process.env.JWT_SECRET;

const userQueries = require("../../models/queries/user")

module.exports = {
    async signup(req, res) {
        let email = req.body.email
        let name = req.body.name
        let password = req.body.password
        saltRounds = 10
        try {
            let userExist = await userQueries.getUserEmail(email);

            if (userExist && userExist != null) {
                // console.log(email)
                return res.status(422).send({ code: 422, status: "failed", msg: "email already exist" })
            }

            password = await bcrypt.hash(password, saltRounds)
            if (!userExist) {
                let data = {
                    email: email,
                    name: name,
                    password: password
                }
                await userQueries.saveUser(data)
            }
            res.status(200).json({ code: 200, status: "success", msg: "user created Successfully" })

        } catch (err) {
            console.log("error : ", err);
            return res.status(422).send({ code: 422, status: 'failed', msg: err.message });
         }
    },
    async login(req, res) {
        console.log(secretKey)
        let email = req.body.email
        let password = req.body.password

        try {
            let userExist = await userQueries.getUserEmail(email);
            if (userExist == null) {
                return res.status(422).send({ status: "Email not Exist" })
            }
            hash = await bcrypt.hash(password, 10)

            password = await bcrypt.compare(password, userExist.password)

            if (userExist && password) {
                var token = jwt.sign({
                    email: userExist.email,
                    password: userExist.password
                }, secretKey)
                return res.status(200).send({ status: 'success', token: token })
            } else {
                console.log("email is invalid")
                return res.status(422).send({ status: "Wrong password" })
            }
        } catch (err) {
            console.log("error : ", err);
            return res.status(422).send({ code: 422, status: 'failed', msg: err.message });
           }

    }
}