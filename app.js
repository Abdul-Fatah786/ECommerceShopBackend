const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");

const app = express();

const debugMiddleware = (req, res, next) => {
    console.log("Request Path", req.path)
};

const connectToDB = require("./src/db/db.js");



const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
    Credentials: true
};

app.use(debugMiddleware);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser);

app.use("/", (req, res) => {
    res.send("Hello World !")
});



connectToDB();



module.exports = app;