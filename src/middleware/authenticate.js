const jwt = require('jsonwebtoken');
const UserModel = require('../Model/UserModel');
const TokenBlacklist = require('../Model/TokenBlacklist');

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw new Error("Authentication required");

        // Check if token is blacklisted
        const blacklisted = await TokenBlacklist.findOne({ token });
        if (blacklisted) throw new Error("Token invalidated");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded._id);
        if (!user) throw new Error("User not found");

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

module.exports = authenticate;