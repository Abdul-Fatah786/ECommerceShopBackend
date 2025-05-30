const jwt = require('jsonwebtoken');
const UserModel = require("../Model/UserModel.js");
const UserServices = require("../Services/UserService.js")
const { validationResult } = require("express-validator")
// const OtpController = require("./OtpControler.js")
const randomString = require("../utils/randomString.js");
const TokenBlacklist = require("../Model/TokenBlacklist.js");

const registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        const { fullname, email, phoneNo, password, role } = req.body;
        console.log(fullname, email, phoneNo, password, role)

        // const otp = Math.floor(100000 + Math.random() * 900000);
        // console.log("OTP generated:", otp);

        const newUser = await UserServices.createUser({
            fullname,
            email,
            phoneNo,
            password,
            role: role || "customer",
            // otp: otp,  // Only pass the OTP code here      
        });

        // const OTP = await OtpController.sendOtp(email, otp);
        // console.log("OTP sent:", OTP);

        res.status(201).json({
            message: "User registered successfully. OTP sent for verification",
            userID: newUser._id
        });
    } catch (error) {
        console.error("Registration error:", error);
        next(error);
    };
};
const verifyUser = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required"
            });
        }

        const user = await UserModel.findOne({ email })
            .select("+otp.code +otp.expiresAt");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.otp.expiresAt < Date.now()) return res.status(400).json({
            message: "OTP expired. Please request a new one"
        });

        if (user.otp.code !== otp) return res.status(400).json({ message: "invalid OTP" });

        user.otp.verified = true;
        user.status = "active";

        await user.save();

        return res.status(200).json({
            message: "OTP verified successfully. Account activated.",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                status: user.status,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Verification error:", error);
        next(error)
    }
}


const loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        const user = await UserModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) return res.status(401).json({ message: "invalid email or password" })

        if (!user.otp.verified) return res.status(401).json({
            message: "Please verify your account first or request a new OTP",
        });
        const token = user.generateAuthToken();

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                status: user.status,
                role: user.role,
            }
        });
    } catch (error) {
        console.log("Error Login User", error)
        next(error)
    }
}

const logoutUser = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Authorization token required"
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const expiresAt = new Date(decoded.exp * 1000);

        const existingToken = await TokenBlacklist.findOne({ token });
        if (existingToken) {
            return res.status(200).json({
                success: true,
                message: "Already logged out"
            });
        }
        await TokenBlacklist.create({ token, expiresAt });


        res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        console.error("Logout error:", error);
        next(error);
    }
}

const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email })

        if (!user) return res.status(404).json({ message: "user not found" })
        const newPassword = randomString();
        const hashPassword = await UserModel.hashPassword(newPassword)

        user.password = hashPassword
        await user.save()

        res.status(200).json({ message: "new password has been sent to you email" })

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find()
        return res.json(users)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    registerUser,
    verifyUser,
    loginUser,
    forgotPassword,
    getAllUsers,
    logoutUser,
}