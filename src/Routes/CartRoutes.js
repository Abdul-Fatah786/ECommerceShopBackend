const express = require('express');
const {
    CreateCart,
    getByUserID,
    updateByUserID,
    deleteByUserID,
    getAllCart
} = require('../Controller/CartController');
const router = express.Router();

router
    .post('/', CreateCart)
    .get('/', getAllCart)
    .get('/:userId', getByUserID)
    .put('/:userId/:productId', updateByUserID)
    .delete('/:userId/:productId', deleteByUserID)

module.exports = router;
