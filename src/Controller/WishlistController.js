const wishlistModel = require("../Model/WishlistModel.js");

const getAllWishlist = async (req, res) => {
    try {
        const allWishList = await wishlistModel.find().populate('user').populate('product')
        res.status(200).json({ AllWishList: allWishList })
    } catch (error) {
        res.status(500).json({ message: "Error Fetching all Wishlist" })
    }
}

const createWishlist = async (req, res) => {
    try {
        const wishlist = await wishlistModel(req.body)
        await wishlist.save()
        const populatedWishlist = await wishlist.populate("user").populate("product")
        res.status(201).json({ message: "Product Added to wihslist", wishlist: populatedWishlist })
    } catch (error) {
        res.status(500).json({ message: "Error adding product to wishlist, please try again later" })
    }
}

const getByUserID = async (req, res) => {
    try {
        const { userId } = req.params
        const wishlistItems = await wishlistModel.find({ user: userId, }).populate('product')
        res.status(200).json({ wishlist: wishlistItems })
    } catch (error) {
        res.status(500).json({ message: "Error Getting by User ID" })
    }
}

const updateByUserID = async (req, res) => {
    try {
        const { userId, productId } = req.params
        const updatedItem = await wishlistModel.findOneAndUpdate(
            { user: userId, product: productId },
            req.body,
            { new: true }
        ).populate('user').populate('product')

        if (!updatedItem) return res.status(404).json({ message: "Wishlist Item not found" })

        res.status(200).json({ message: "Wishlist item updated", updatedItem })
    } catch (error) {
        res.status(500).json({ message: "Error Updating By ID" })
    }
}

const deleteByUserID = async (req, res) => {
    try {
        const { userId, productId } = req.params
        const deletedItem = await wishlistModel.findOneAndDelete({ user: userId, product: productId })

        if (!deletedItem) return res.status(404).json({ message: "Wishlist Item not found" })

        res.status(200).json({ message: "wishlist item deleted", deletedItem })
    } catch (error) {
        res.status(500).json({ message: "Error Deleting By ID" })
    }
}

module.exports = {
    createWishlist,
    getByUserID,
    updateByUserID,
    deleteByUserID,
    getAllWishlist
}
