const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const {
    registerUser,
    loginUser,
    verifyUser,
    forgotPassword
} = require("../Controller/UserController.js");


router.post("/register", [
    body("email").isEmail().withMessage("Inavlid Email"),
    body("fullname")
        .isLength({ min: 3 })
        .withMessage("Full name must be 3 character long"),
    body("password")
        .isLength({ min: 3 })
        .withMessage("Password must be 3 charactrs long")
], registerUser);

router.post("/login", [
    body("email").isEmail().withMessage("Inavlid Email"),
    body("password")
        .isLength({ min: 3 })
        .withMessage("Password must be 3 charactrs long")

], loginUser)

router.post("/verify", verifyUser)
router.post("/forgot-password", [
    body("email").isEmail().withMessage("Invalid Email")
], forgotPassword)

module.exports = router