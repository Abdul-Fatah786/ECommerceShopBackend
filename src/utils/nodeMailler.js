const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_PASSWORD,
        pass: process.env.SMTP_MAIL,
    }
})

module.exports = { transporter }