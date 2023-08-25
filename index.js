const express = require('express')
const cors = require('cors')
const mongooseConnect = require("./configs/mongoDB.connect");
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

const authRouter = require("./routes/auth.routes")
app.use("/auth", authRouter)

const authMiddleware = require("./middleware/auth.middleware");

const reviewRouter = require("./routes/review.routes")
app.use("/", authMiddleware , reviewRouter)


app.listen(8000, (err)=> {
    if(err){
        console.error(err)
        return
    }
    console.log('serving app on port 8000')
    mongooseConnect()
})