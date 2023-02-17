const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

function connectMongoos() {
  mongoose
    // .connect(process.env.DB_connect, { useNewUrlParser: true })
    .connect(
      "mongodb+srv://usman_farooq:usman_farooq@cluster0.zc8iddw.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Data Base connected");
    })
    .catch((err) => {
      console.log("not connected");
    });
}

module.exports = connectMongoos;
