const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected successfully.");
  } catch (err) {
    console.log(err);
  }
}

module.exports = main;