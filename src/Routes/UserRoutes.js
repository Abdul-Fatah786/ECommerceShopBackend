const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    verifyUser,
    forgotPassword,
    getAllUsers
} = require("../Controller/UserController.js");
const {
    userValidationRegister,
    userValidationLogin,
    forgotPasswordValidation
} = require("../middleware/UserMiddleware.js");


router.get("/", getAllUsers);
router.post("/register", userValidationRegister, registerUser);
router.post("/login", userValidationLogin, loginUser)
router.post("/verify", verifyUser)
router.post("/forgot-password", forgotPasswordValidation, forgotPassword)

module.exports = router