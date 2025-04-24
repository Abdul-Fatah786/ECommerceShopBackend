const mongoose = require("mongoose")
require("./ProductModel")
require("./UserModel")

const cartSchema = new mongoose.Schema({
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
    quantity: {
        type: Number,
        default: 1,
    }
}, { timestamps: true })

module.exports = new mongoose.model("Cart", cartSchema)
