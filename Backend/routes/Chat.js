const express = require("express");
const routes = express.Router();
const {getAllThread,getAllThreadId,DeleteThread,createNewThread}=require("../controllers/ChatCon");
const { isLogin }=require("../middleware/isloggedin");
const gptModel=require("../models/GPT_models");


routes.post("/test", async (req, res) => {
    try {
        const thread = await gptModel.create({
            threadId: "xyz1",
            title: " 2nd Testing New Thread"
        });
        res.send(thread);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        })
    }
});

//get all threads
routes.get("/thread",isLogin,getAllThread);

routes.get("/thread/:threadId",isLogin, getAllThreadId);

routes.delete("/thread/:threadId",isLogin,DeleteThread)

routes.post("/chat",isLogin,createNewThread);

module.exports = routes;