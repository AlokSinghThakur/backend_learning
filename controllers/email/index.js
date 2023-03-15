const sgMail = require('@sendgrid/mail')
const fs = require('fs')
var jsrender = require('jsrender');
// var htmlfile = require('../email/followUser.html')
// console.log(htmlfile)

var html = jsrender.renderFile('./controllers/email/mail.html',{ name: "shivam" })

// var tmpl = jsrender.templates('Name - {{:name}}<br/>'); // Compile template from string

// var html = tmpl.render({name: "Jim"}); // Render
// result: "Name - Jim<br/>"
module.exports = {
    async email(req, res) {
        let name = req.body.name

        console.log(html)
        try {

            const msg = {
                to: 'chalokoina08@gmail.com', // Change to your recipient
                from: 'alokthakur08cse@gmail.com', // Change to your verified sender
                subject: 'testing mail',
                text: 'testing text fun',
                html: html
            }
            sgMail
                .send(msg)
                .then(() => {
                    console.log('Email sent')
                })
                .catch((error) => {
                    console.error(error)
                })

        } catch (err) {
            console.log("error : ", err);
            return res.status(422).send({ code: 422, status: 'failed', msg: err.message });

        }

    }
}