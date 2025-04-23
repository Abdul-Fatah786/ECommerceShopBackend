const mongoose = require("mongoose")

const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        require: true
    },
    note: {
        type: String,
    }
}, { timestamps: true })

const wishlistModel = new mongoose.model("Wishlist", wishlistSchema)
module.exports = wishlistModel