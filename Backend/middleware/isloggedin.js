const userModel = require("../models/user_models")
const jwt = require("jsonwebtoken");



module.exports.isLogin = async (req, res, next) => {
    try {
        if (!req.cookies || !req.cookies.token) {
            return res.status(401).json({
                message: "User not login."
            })
        }

        const decode = jwt.verify(req.cookies.token, process.env.JWT_SECRET);//id: decode.id
        const user = await userModel.findOne({ email: decode.email })
        if (!user) {
            return res.status(401).json({
                messgae: "User not found."
            })
        }
        req.user = user;
        next();

    } catch (err) {  //token invalid or expoired case handle
        console.log(err);
        return res.status(401).json({
            message: "Invalid or expired token."
        })
    }
}