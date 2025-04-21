const { body } = require('express-validator');

const productValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 100 }).withMessage('Name must be less than 100 characters'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ max: 1000 }).withMessage('Description too long'),
    body('price')
        .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('imageUrl')
        .optional()
        .isURL().withMessage('Invalid image URL format')
];
module.exports = { productValidation }