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

    },
    async editEmail(req, res) {
        let userId = req.body.id;
        let data = req.body;

        if (!data) return res.status(422).send({ code: 422, status: 'failed', msg: 'Data is required' })
        try {
            if (data.email) {
                let mailUsed = await userQueries.getUserEmail(data.email)
                if (mailUsed && mailUsed.id != userId)
                    return res.status(422).send({ code: 422, status: 'failed', msg: 'Email already exist' })
            }
            await userQueries.editProfile(userId, data)
            let userDetails = await userQueries.getUserById(userId)
            return res.status(200).send({ code: 200, status: 'success', msg: 'details changed successfully.', data: userDetails });
        } catch (err) {
            console.log(err);
            return res.status(422).send({ code: 422, status: 'failed', msg: err.message });
        }
    },
    async editmobileNo(req, res) {
        let userId = req.body.id;
        let data = req.body;

        if (!data) return res.status(422).send({ code: 422, status: 'failed', msg: 'Data is required' })
        console.log(data.mobileno)
        try {
            if (data.mobileno) {
                let numberUsed = await userQueries.getUserNumber(data.mobileno)
                console.log(numberUsed)
                if (numberUsed && numberUsed.id != userId)
                    return res.status(422).send({ code: 422, status: 'failed', msg: 'number already exist' })
            }
            await userQueries.editProfile(userId, data)
            let userDetails = await userQueries.getUserById(userId)
            return res.status(200).send({ code: 200, status: 'success', msg: 'details changed successfully.', data: userDetails });
        } catch (err) {
            console.log(err);
            return res.status(422).send({ code: 422, status: 'failed', msg: err.message });
        }
    },
    async getMyPRofile(req, res) {
        let userId = req.body.user_id
        try {
            let userDetails = await userQueries.getUserById(userId)
            return res.status(200).send({ code: 200, status: 'success', data: userDetails });
        } catch (err) {
            return res.status(422).send({ code: 422, status: 'failed', msg: err.message });
        }
    },
    async editMyProfile(req, res) {
        let userId = req.body.user_id
        let data = req.body;


        if (!data) return res.status(422).send({ code: 422, status: 'failed', msg: 'Data is required' })

        try {
            if (data.user_id) {
                let userData = await userQueries.getUserById(data.user_id)
                // if (userData && userData.id != userId)
                //     return res.status(422).send({ code: 422, status: 'failed', msg: 'Email already exist' })
console.log(userData.age)
                if (userData.age == data.age)
                    return res.status(422).send({ code: 422, status: 'failed', msg: 'age already exist' })

                if (userData.gender == data.gender)
                    return res.status(422).send({ code: 422, status: 'failed', msg: 'gender already exist' })

                if (userData.name == data.name)
                    return res.status(422).send({ code: 422, status: 'failed', msg: 'name already exist' })


            }
            await userQueries.editProfile(userId, data)
            let userDetails = await userQueries.getUserById(userId)
            return res.status(200).send({ code: 200, status: 'success', msg: 'details changed successfully.', data: userDetails });



        } catch (err) {
            return res.status(422).send({ code: 422, status: 'failed', msg: err.message });
        }
    }
}