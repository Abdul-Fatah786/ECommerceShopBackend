const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const defaultImage =
    "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minLength: [3, "Full name must be at least 3 characters long"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email must be at least 5 characters long"],
    },
    phoneNo: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive",
    },
    image: {
        type: String,
        default: defaultImage,
    },
    otp: {
        verified: {
            type: Boolean,
            default: false,
        },
        code: String,
        expiresAt: Date,
    },

}, { timestamps: true });

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "90h"
    });
    return token;
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel