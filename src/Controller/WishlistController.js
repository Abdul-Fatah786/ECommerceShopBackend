const wishlistModel = require("../Model/WishlistModel.js");

const createWishlist = async (req, res) => {
    try {
        const wishlist = await wishlistModel(req.body).populate()
        await wishlist.save()
        res.status(201).json({ Wishlist: wishlist })
    } catch (error) {
        res.status(500).json({ message: "Error adding product to wishlist, please try again later" })
    }
}
module.exports = {
    createWishlist
}