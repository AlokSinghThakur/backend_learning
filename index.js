const express = require("express");
require('./models')
require('dotenv').config()
const app = express();
const models = require('./models')
const port = 3000
const USER_ROUTES = require('./routes')

app.use('/user' , USER_ROUTES)
app.use(express.json())

models.db_config
.sync({
    // force:true
})
.then(() => {
    console.log("Connected to Databse!");
})
.catch(err => {
    console.log('Database not connected', err)
})

app.listen(port, () => {
    console.log(`App is listening at localhost:${port}`)
})