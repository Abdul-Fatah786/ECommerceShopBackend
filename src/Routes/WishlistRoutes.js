const express = require("express");
const router = express.Router();
const {
    createWishlist,
    getByUserID,
    updateByUserID,
    deleteByUserID
} = require("../Controller/WishlistController.js");

router
    .post("/", createWishlist)
    .get("/:userId", getByUserID)
    .patch("/:userId/:productId", updateByUserID)
    .delete("/:userId/:productId", deleteByUserID)

module.exports = router