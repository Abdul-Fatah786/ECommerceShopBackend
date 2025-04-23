const mongoose = require("mongoose")

const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    note: {
        type: String,
    }
}, { timestamps: true })

const wishlistModel = new mongoose.model("Wishlist", wishlistSchema)
module.exports = wishlistModel