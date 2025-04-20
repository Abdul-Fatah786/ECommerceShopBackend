const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
// const cors = require("cors")
// const cookieParser = require("cookie-parser")
// const path = require("path")
// const fs = require("fs")

const app = express();

const debugMiddleware = (req, res, next) => {
    console.log("Request Path", req.path)
}

app.use(debugMiddleware)

const connectToDB = require("./src/db/db.js")





connectToDB()



module.exports = app