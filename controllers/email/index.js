const sgMail = require('@sendgrid/mail')
const fs = require('fs')
sgMail.setApiKey('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')
var jsrender = require('jsrender');
var html = jsrender.renderFile('./controllers/email/mail.html',{ name: "shivam" })

module.exports = {
    async email(req, res) {
        let name = req.body.name

        // console.log(html)
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
                    return res.send({msg:'success'})
                })
                .catch((error) => {
                    console.error(error)
                    return res.send({msg:error})
                })
                // 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
                // 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
               

        } catch (err) {
            console.log("error : ", err);
            return res.status(422).send({ code: 422, status: 'failed', msg: err.message });

        }

    }
}