const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const DB = require("./config/DataBae.js");
const userRoute = require("./routes/userRoute.js");
const chatRoutes = require("./routes/Chat.js");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://https-lnkd-in-d-f4zs-mzj.vercel.app"
    ],
    credentials: true
  })
);

app.use("/api/auth", userRoute);
app.use("/api", chatRoutes);

DB();

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});