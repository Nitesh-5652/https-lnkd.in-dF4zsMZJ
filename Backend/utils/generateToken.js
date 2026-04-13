const jwt=require("jsonwebtoken")

module.exports.generateToken = (user) => {
    const token = jwt.sign({ email: user.email, user_id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
    return token;
}