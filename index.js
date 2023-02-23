const express = require("express");
require('./models')
require('dotenv').config()
const app = express();
app.use(express.json())

const port = 3000


const models = require('./models')
const USER_ROUTES = require('./routes')





app.use('/user' , USER_ROUTES)


models.db_config
.sync({
    // force:true
})
.then(() => {
    console.log("Connected to Database!");
})
.catch(err => {
    console.log('Database not connected', err)
})



app.listen(port, () => {
    console.log(`App is listening at localhost:${port}`)
})