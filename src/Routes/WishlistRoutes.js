const express = require("express");
const router = express.Router();
const {
    createWishlist,
    getByUserID,
    updateByUserID,
    deleteByUserID,
    getAllWishlist
} = require("../Controller/WishlistController.js");

router
    .get("/", getAllWishlist)
    .post("/", createWishlist)
    .get("/:userId", getByUserID)
    .patch("/:userId/:productId", updateByUserID)
    .delete("/:userId/:productId", deleteByUserID)

module.exports = router