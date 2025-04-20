const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const debugMiddleware = (req, res, next) => {
    console.log("Request Path:", req.path);
    next();
};
const connectToDB = require("./src/db/db.js");
const UserRoutes = require("./src/Routes/UserRoutes.js");

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: true
};

app.use(debugMiddleware);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health Route
app.get("/", (_, res) => {
    res.json({ message: "Welcome to ECommerceShop Backend." })
})
app.use("/users", UserRoutes)

connectToDB();

module.exports = app;