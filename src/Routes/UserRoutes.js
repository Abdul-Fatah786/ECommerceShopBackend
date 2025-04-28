const express = require("express");
const router = express.Router();
// const authenticate = require("../middleware/authenticate.js");
const {
    registerUser,
    loginUser,
    // verifyUser,
    forgotPassword,
    getAllUsers,
    logoutUser
} = require("../Controller/UserController.js");

const { body } = require("express-validator");



router.get("/", getAllUsers);
router.post("/register", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname")
        .isLength({ min: 3 })
        .withMessage("Full name must be 3 character long"),
    body("password")
        .isLength({ min: 3 })
        .withMessage("Password must be 3 characters long")
], registerUser);

router.post("/login", [body("email").isEmail().withMessage("Invalid Email"),
body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be 3 characters long")
], loginUser);
router.post("/logout", logoutUser);
// router.post("/verify", authenticate, verifyUser);
router.post("/forgot-password", [
    body("email").isEmail().withMessage("Invalid Email")
], forgotPassword);

module.exports = router