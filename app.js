const express = require("express");
const app = express();
const morgan = require("morgan");
const errorHandler = require("./src/middleware/custome_error");

//middlewares
app.use(express.json());
app.use(morgan("tiny"));

//Cors
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

// port listning
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("running on port 3000");
});

// all Routers

// Accounts Routers
app.get("/", (req, res) => {
  res.send("Welcome to Taiba kids School system");
});

const authRouter = require("./src/api/routers/auth/auth-router");
app.use("/auth", authRouter);

const currAli = require("./src/api/routers/currency_alliance/cuurency-alliance");
app.use("/currAlli", currAli);

// handle error
app.use(errorHandler);

module.exports = app;
