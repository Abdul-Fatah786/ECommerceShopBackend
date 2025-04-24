const CartModel = require('../Model/CartModel');

const CreateCart = async (req, res) => {
    try {
        const cart = new CartModel(req.body);
        await cart.save();
        res.status(201).json({ message: "Cart created successfully", cart });
    } catch (error) {
        console.error("Error creating cart:", error);
        res.status(500).json({ message: "Error creating cart" });
    }
}

const getAllCart = async (req, res) => {
    try {
        const allCart = await CartModel.find().populate('user').populate('product');
        res.status(200).json({ AllCart: allCart });
    } catch (error) {
        console.error("Error fetching all carts:", error);
        res.status(500).json({ message: "Error fetching all carts" });
    }
}

const getByUserID = async (req, res) => {
    try {
        const { userId } = req.params;
        const cartItems = await CartModel.find({ user: userId }).populate('product');
        res.status(200).json({ cart: cartItems });
    } catch (error) {
        console.error("Error fetching cart by user ID:", error);
        res.status(500).json({ message: "Error fetching cart by user ID" });
    }
}
const updateByUserID = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const updatedItem = await CartModel.findOneAndUpdate(
            { user: userId, product: productId },
            req.body,
            { new: true }
        ).populate('user').populate('product');

        if (!updatedItem) return res.status(404).json({ message: "Cart item not found" });

        res.status(200).json({ message: "Cart item updated", updatedItem });
    } catch (error) {
        console.error("Error updating cart item:", error);
        res.status(500).json({ message: "Error updating cart item" });
    }
}
const deleteByUserID = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const deletedItem = await CartModel.findOneAndDelete(
            { user: userId, product: productId }
        );

        if (!deletedItem) return res.status(404).json({ message: "Cart item not found" });

        res.status(200).json({ message: "Cart item deleted", deletedItem });
    } catch (error) {
        console.error("Error deleting cart item:", error);
        res.status(500).json({ message: "Error deleting cart item" });
    }
}   

module.exports = {
    CreateCart,
    getByUserID,
    updateByUserID,
    deleteByUserID,
    getAllCart
}