const userModel = require("./../../models/user.model");
const errorResp = require("./../../../utils/error_response");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const validations = require("../../validations/validations");
const jwt = require("jsonwebtoken");

const addNewUser = async (req, res, next) => {
  try {
    //   testing unique UserName:
    const userNameExists = await userModel.findOne({
      user: req.body.user,
    });
    if (userNameExists) {
      return next(new errorResp("", "User Name Already Exists", 400));
    }
    // Hash the pass
    if (req.body?.password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashPassword;
    }
    //   saving new user
    const newUser = new userModel(req.body);
    let savedUser = await newUser.save();
    req.savedUser = savedUser;
    res.status(201).send(savedUser);
  } catch (error) {
    console.log("is it commig here");
    next(new errorResp(error, "Cannot create Data", 400));
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    let allActiveUsers = await userModel.find();
    res.status(200).send(allActiveUsers);
  } catch (error) {
    next(new errorResp(error, `Users not found in database`, 404));
  }
};

const getAllActiveUsers = async (req, res, next) => {
  try {
    let allActiveUsers = await userModel.find({ isDeleted: false });
    res.status(200).send(allActiveUsers);
  } catch (error) {
    next(new errorResp(`User not found in database`, 404));
  }
};

const getUserById = async (req, res, next) => {
  try {
    const userData = await userModel.findById(req.params.id);
    res.status(200).send(userData);
  } catch (err) {
    next(new errorResp(err));
  }
};

const login = async (req, res, next) => {
  const { error } = validations.loginValidation(req.body);
  if (error) return next(new errorResp(error, error.details[0].message, 400));
  const user = await userModel.findOne({ user: req.body.userName });
  if (user == null || user == undefined) {
    return res
      .status(500)
      .json({ success: false, message: "UserName is wrong: " });
  }
  if (user.isDeleted.toString() === "true")
    return next(
      new errorResp(
        "",
        "Admin has disabled You. Please contact admin to activate it",
        400
      )
    );
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return next(new errorResp("", "Password is wrong", 400));

  // Create and assign a token
  const token = jwt.sign(
    { _id: user._id, role: user.role, date: new Date().toDateString() },
    process.env.token_private,
    { expiresIn: "14d" }
  );
  res.header("auth-token", token).json({ token: token, userData: user });
};

const changeForgotPassword = async (req, resp, next) => {
  try {
    const { error } = validations.forgotPassValidations(req.body);
    if (error) return next(new errorResp(error, error.details[0].message, 400));
    const user = await userModel.findOne({
      userName: req.body.userName,
      email: req.body.email,
    });
    if (user == undefined || user == null)
      return next(
        new errorResp(
          "",
          `Data not found against ${req.body.userName} & ${req.body.email}`,
          404
        )
      );

    // hash new password
    if (req.body?.newPass) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.newPass, salt);
      req.body.newPass = hashPassword;
    }

    user.password = req.body.newPass;
    updatedData = await userModel.findByIdAndUpdate(user._id.toString(), user);
    resp.status(200).send(updatedData);
  } catch (err) {
    next(new errorResp(err, "Forgot password error", 401));
  }
};

const disAbleUser = async (req, res, next) => {
  try {
    const updateUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    res.status(200).send(updateUser);
  } catch (error) {
    next(new errorResp(error, "Error in hiding user ", 401));
  }
};

module.exports = {
  addNewUser,
  login,
  getAllUsers,
  changeForgotPassword,
  getUserById,
  disAbleUser,
  getAllActiveUsers,
};
