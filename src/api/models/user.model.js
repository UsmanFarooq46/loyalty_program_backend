const mongoose = require("mongoose");

const userModelSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, "User name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
  },
  isDeleted: {
    tpye: Boolean,
    default: false,
  },
});

const userModel = mongoose.model("user", userModelSchema);
module.exports = userModel;
