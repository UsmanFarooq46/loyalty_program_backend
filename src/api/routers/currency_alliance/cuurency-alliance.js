const express = require("express");
const router = express.Router();
const CurrAlliController = require("./../../controllers/currency_alliance/currency-alliance");
const verifyAuth = require("./../../../middleware/auth_check");

router.post("/addNewMember", CurrAlliController.addNewMember); //auth/addNewUser
router.post("/sendMoney", CurrAlliController.sendMoney);
router.post(
  "/memberData",
  verifyAuth.authVerify,
  CurrAlliController.memberData
);
router.post(
  "/memberTransaction",
  verifyAuth.authVerify,
  CurrAlliController.memberTransaction
);

router.post("/directAccrual", CurrAlliController.directAcrual);

module.exports = router;
