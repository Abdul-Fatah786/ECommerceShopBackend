const mongoose = require("mongoose")
require("./ProductModel")
require("./UserModel")

const wishlistSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    note: String

}, { timestamps: true })

module.exports = new mongoose.model("Wishlist", wishlistSchema)
