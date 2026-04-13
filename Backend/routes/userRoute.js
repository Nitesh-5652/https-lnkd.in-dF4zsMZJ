const express = require("express")
const routes = express.Router();
const { UserSignup, UserLogin, UserLogout, UsergetMe } = require("../controllers/userCon.js")
const { isLogin } = require("../middleware/isloggedin.js");


routes.post("/register", UserSignup);

routes.post("/login", UserLogin);

routes.get("/logout", UserLogout);

routes.get("/get_me", isLogin, UsergetMe);

module.exports = routes;