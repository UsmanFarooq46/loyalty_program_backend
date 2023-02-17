const express = require("express");
const router = express.Router();
const authController = require("./../../controllers/auth/auth-controller");
const verifyAuth = require("./../../../middleware/auth_check");
const CurrAlliController = require("./../../controllers/currency_alliance/currency-alliance");

router.post("/addNewUser", authController.addNewUser); //auth/addNewUser
router.post("/login", authController.login); //auth/login
router.get("/getAllUsers", verifyAuth.authVerify, authController.getAllUsers); //auth/getAllUsers
router.get(
  "/getUserById/:id",
  verifyAuth.authVerify,
  authController.getUserById
); //auth/getUserById/:id
router.post("/forgotPass", authController.changeForgotPassword); //auth/forgotPass
router.get("/disAbleUser/:id", verifyAuth.isAdmin, authController.disAbleUser); //auth/disAbleUser/:id

module.exports = router;
