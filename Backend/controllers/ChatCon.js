const gptModel = require("../models/GPT_models");
const { getGeminiAPIResponse } = require("../services/Open_Ai_Service");


module.exports.getAllThread = async (req, res) => {
    try {
        const threads = await gptModel.find({ user: req.user.id }).sort({ updatedAt: -1 });  //descending order most recent data on top
        // console.log(threads)
        res.status(200).json(threads)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports.getAllThreadId = async (req, res) => {
    const { threadId } = req.params;
    try {
        const threads = await gptModel.findOne({ threadId: threadId, user: req.user.id });
        if (!threads) {
            return res.status(404).json({
                message: "Thread not fount"
            })
        }
        res.status(200).json(threads.messages)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports.DeleteThread = async (req, res) => {
    const { threadId } = req.params;
    try {//, user: req.user.id 
        const Deletethreads = await gptModel.findOneAndDelete({ threadId: threadId, user: req.user.id });
        if (!Deletethreads) {
            return res.status(404).json({
                message: "Thread not found."
            })
        }
        res.status(200).json({
            message: "Thread deleted successfully."
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports.createNewThread = async (req, res) => {
    const { threadId, message } = req.body;
    // console.log(req.user.id);

    if (!threadId || !message) {
        return res.status(400).json({
            message: "missing required fields"
        })
    }

    try {
        let threads = await gptModel.findOne({ threadId: threadId, user: req.user.id });
        if (!threads) {
            //create a new thread
            threads = new gptModel({
                user: req.user.id,
                threadId,
                title: message,
                messages: [{ role: "user", content: message }]
            });
        } else {
            threads.messages.push({ role: "user", content: message });
        }

        const assistantReply = await getGeminiAPIResponse(message);
        threads.messages.push({ role: "assistant", content: assistantReply });
        threads.updatedAt = new Date();
        await threads.save();
        res.status(200).json({
            reply: assistantReply
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
}