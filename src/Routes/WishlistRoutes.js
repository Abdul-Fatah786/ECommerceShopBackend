const express = require("express");
const router = express.Router();
const {
    createWishlist
} = require("../Controller/WishlistController.js");

router
    .post("/", createWishlist)

module.exports = router