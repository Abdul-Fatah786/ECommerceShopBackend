const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product Name is requiried"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Product Name is required"]
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price must be a positive number']
    },
    imageUrl: {
        type: String,
        default: 'https://via.placeholder.com/150'
    },
    category: {
        type: String,
        required: [true, "Product category is required"],
        trim: true
    },
    stock: {
        type: Number,
        required: [true, "Product stock is required"],
        min: [0, "Stock must be a non-negative number"]
    }
}, { timestamps: true });

module.exports = new mongoose.model("Product", productSchema)