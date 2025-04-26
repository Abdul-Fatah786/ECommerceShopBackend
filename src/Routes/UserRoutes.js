const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate.js");
const {
    registerUser,
    loginUser,
    verifyUser,
    forgotPassword,
    getAllUsers,
    logoutUser
} = require("../Controller/UserController.js");

const {
    userValidationRegister,
    userValidationLogin,
    forgotPasswordValidation
} = require("../middleware/UserMiddleware.js");



router.get("/", getAllUsers);
router.post("/register", userValidationRegister, registerUser);
router.post("/login", userValidationLogin, loginUser)
router.post("/logout", logoutUser)
router.post("/verify", authenticate, verifyUser)
router.post("/forgot-password", forgotPasswordValidation, forgotPassword)

module.exports = router