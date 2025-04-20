const UserModel = require("../Model/UserModel.js");

module.exports.createUser = async ({ fullname, email, phoneNo, password, role = "customer", otp }) => {
    try {
        if (!fullname || !email || !password || !phoneNo) {
            throw new Error("All fields are required");
        };


        // check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            throw new Error("User Already Exists")
        };

        // hash the password surely 
        const hashPassword = await UserModel.hashPassword(password);

        //generate the OTP (10 minutes verification time)
        const otpExpiresAt = Date.now() + 10 * 60 * 1000;

        //create the user 
        const user = await UserModel.create({
            fullname,
            email,
            phoneNo,
            password: hashPassword,
            role,
            status: "inactive",
            otp: {
                code: otp.toString(),
                expiresAt: otpExpiresAt
            }
        });

        return user

    } catch (error) {
        throw new Error(error.message || "User Creation failed");
    }
};