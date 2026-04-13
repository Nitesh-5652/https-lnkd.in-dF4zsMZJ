const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser")
const DB = require("./config/DataBae.js")
const userRoute = require("./routes/userRoute.js");
const chatRoutes=require("./routes/Chat.js");


const port = process.env.PORT;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
 

app.use("/api/auth", userRoute);
app.use("/api",chatRoutes);


app.listen(port, () => {
    console.log("server create successfully.");
    DB();
})