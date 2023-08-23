const express = require('express')
const app = express()
const mongooseConnect = require("./configs/mongoDB.connect");
require("dotenv").config()

app.use(express.json())

app.listen(8000, (err)=> {

    console.log('serving app on port 8000')
    mongooseConnect()
})