const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const {
    registerUser,
    loginUser,
    verifyUser,
    forgotPassword
} = require("../Controller/UserController.js");
const {
    userValidationRegister,
    userValidationLogin,
    forgotPasswordValidation
} = require("../middleware/UserMiddleware.js");


router.post("/register", userValidationRegister, registerUser);
router.post("/login", userValidationLogin, loginUser)
router.post("/verify", verifyUser)
router.post("/forgot-password", forgotPasswordValidation, forgotPassword)

module.exports = router