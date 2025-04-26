const { body } = require("express-validator");

const userValidationRegister = () => [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname")
        .isLength({ min: 3 })
        .withMessage("Full name must be 3 character long"),
    body("password")
        .isLength({ min: 3 })
        .withMessage("Password must be 3 characters long")
];

const userValidationLogin = () => [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
        .isLength({ min: 3 })
        .withMessage("Password must be 3 characters long")
];

const forgotPasswordValidation = () => [
    body("email").isEmail().withMessage("Invalid Email")
];

module.exports = {
    userValidationRegister,
    userValidationLogin,
    forgotPasswordValidation
};