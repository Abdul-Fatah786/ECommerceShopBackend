const express = require('express');
const { getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../Controller/ProductController');
const { productValidation } = require('../middleware/ProductMiddleware');
const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', productValidation, createProduct);
router.put('/:id', productValidation, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;