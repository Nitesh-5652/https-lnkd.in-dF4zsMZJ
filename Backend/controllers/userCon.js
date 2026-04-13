const userModel = require("../models/user_models.js")
const bcrypt = require("bcrypt")
const { generateToken } = require("../utils/generateToken.js")



module.exports.UserSignup = async (req, res) => {
    let { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    try {
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "your have a already exists Account"
            })
        }
        else {
            bcrypt.genSalt(12, (err, Salt) => {
                bcrypt.hash(password, Salt, async (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            message: "server error"
                        })
                    } else {
                        const user = await userModel.create({
                            username,
                            email,
                            password: hash
                        });
                        let token = generateToken(user);
                        res.cookie("token", token);
                        res.status(200).json({
                            message: "User successfully Signup.",
                            user: {
                                id: user._id,
                                username: user.username,
                                email: user.email
                            }
                        })
                    }
                })
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}


module.exports.UserLogin = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User Account not exists."
            })
        } else {
            bcrypt.compare(password, user.password, (err, result) => {
                if (!result) {
                    return res.status(400).json({
                        message: "Invalid email or password"
                    })
                }
                let token = generateToken(user);
                res.cookie("token", token);
                res.status(200).json({
                    message: "User successfully login.",
                    user: {
                        id: user._id,
                        email: user.email,
                        username: user.username
                    }
                })
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}


module.exports.UserLogout = async (req, res) => {
    try {
        if (!req.cookies || !req.cookies.token) {
            return res.status(400).json({
                message: "User not login."
            });
        }
        res.cookie("token", "");
        res.status(200).json({
            message: "User logout successfully."
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error."
        })
    }
}


module.exports.UsergetMe = async (req, res) => {
    try {
        const user = await userModel.findOne({email:req.user.email}).select("-password");
        if (!user) {
            return res.status(400).json({
                message: "User not found."
            })
        }
        res.status(200).json({
            message: "user details successfully",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}