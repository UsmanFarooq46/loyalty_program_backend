const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

function connectMongoos() {
  mongoose
    .connect(process.env.DB_connect, { useNewUrlParser: true })
    .then(() => {
      console.log("Data Base connected");
    })
    .catch((err) => {
      console.log("not connected");
    });
}

module.exports = connectMongoos;
