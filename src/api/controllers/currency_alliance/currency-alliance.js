const userModel = require("./../../models/user.model");
const errorResp = require("./../../../utils/error_response");
const { hit_request } = require("./../../../utils/axios_api");
const CryptoJS = require("crypto-js");

const addNewMember = async (req, res, next) => {
  try {
    let url = "https://sandbox.api.currencyalliance.com/public/v3.0/members";
    const test = CryptoJS.HmacSHA256(
      JSON.stringify(req.body),
      process.env.secret_key
    );
    const sig = test.toString(CryptoJS.enc.hex);
    let header = {
      Authorization: `Credential=${process.env.public_key}, Signature=${sig}`,
    };
    let result = await hit_request("post", url, req.body, header);
    let stringifyResult = stringify(result);
    let parsedData = JSON.parse(stringifyResult);
    res.status(200).json({
      status: parsedData.status,
      statusText: parsedData.statusText,
      data: parsedData.data,
    });
  } catch (error) {
    console.log("complete error", error);

    next(
      new errorResp(
        error,
        JSON.parse(error.message || "") || "Something Went wrong",
        400
      )
    );
  }
};

const sendMoney = async (req, res, next) => {
  try {
    let url =
      "https://sandbox.api.currencyalliance.com/public/v3.0/transactions";
    const test = CryptoJS.HmacSHA256(
      JSON.stringify(req.body),
      process.env.secret_key
    );
    const sig = test.toString(CryptoJS.enc.hex);
    let header = {
      Authorization: `Credential=${process.env.public_key}, Signature=${sig}`,
    };
    let result = await hit_request("post", url, req.body, header);
    let stringifyResult = stringify(result);
    let parsedData = JSON.parse(stringifyResult);
    res.status(200).json({
      status: parsedData.status,
      statusText: parsedData.statusText,
      data: parsedData.data,
    });
  } catch (error) {
    console.log("complete error", error);
    next(
      new errorResp(
        error,
        JSON.parse(error.message || "") || "Something Went wrong",
        400
      )
    );
  }
};

const memberTransaction = async (req, res, next) => {
  try {
    let url =
      "https://sandbox.api.currencyalliance.com/public/v3.0/members/transactions";
    const test = CryptoJS.HmacSHA256(
      JSON.stringify(req.body),
      process.env.secret_key
    );
    const sig = test.toString(CryptoJS.enc.hex);
    let header = {
      Authorization: `Credential=${process.env.public_key}, Signature=${sig}`,
    };
    let result = await hit_request("post", url, req.body, header);
    let stringifyResult = stringify(result);
    let parsedData = JSON.parse(stringifyResult);
    res.status(200).json({
      status: parsedData.status,
      statusText: parsedData.statusText,
      data: parsedData.data,
    });
  } catch (error) {
    console.log("complete error", error);
    next(
      new errorResp(
        error,
        JSON.parse(error.message || "") || "Something Went wrong",
        400
      )
    );
  }
};

const memberData = async (req, res, next) => {
  try {
    let url =
      "https://sandbox.api.currencyalliance.com/public/v3.0/members/lookup";
    const test = CryptoJS.HmacSHA256(
      JSON.stringify(req.body),
      process.env.secret_key
    );
    const sig = test.toString(CryptoJS.enc.hex);
    let header = {
      Authorization: `Credential=${process.env.public_key}, Signature=${sig}`,
    };
    let result = await hit_request("post", url, req.body, header);
    let stringifyResult = stringify(result);
    let parsedData = JSON.parse(stringifyResult);
    res.status(200).json({
      status: parsedData.status,
      statusText: parsedData.statusText,
      data: parsedData.data,
    });
  } catch (error) {
    console.log("complete error", error);
    next(
      new errorResp(
        error,
        JSON.parse(error.message || "") || "Something Went wrong",
        400
      )
    );
  }
};

const directAcrual = async (req, res, next) => {
  try {
    let url =
      "https://sandbox.api.currencyalliance.com/public/v3.0/accruals/standard";
    const test = CryptoJS.HmacSHA256(
      JSON.stringify(req.body),
      process.env.secret_key
    );
    const sig = test.toString(CryptoJS.enc.hex);
    let header = {
      Authorization: `Credential=${process.env.public_key}, Signature=${sig}`,
    };
    let result = await hit_request("post", url, req.body, header);
    let stringifyResult = stringify(result);
    let parsedData = JSON.parse(stringifyResult);
    res.status(200).json({
      status: parsedData.status,
      statusText: parsedData.statusText,
      data: parsedData.data,
    });
  } catch (error) {
    console.log("complete error", error);
    next(
      new errorResp(
        error,
        JSON.parse(error.message || "") || "Something Went wrong",
        400
      )
    );
  }
};


function stringify(obj) {
  let cache = [];
  let str = JSON.stringify(obj, function (key, value) {
    if (typeof value === "object" && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return;
      }
      // Store value in our collection
      cache.push(value);
    }
    return value;
  });
  cache = null; // reset the cache
  return str;
}

module.exports = {
  addNewMember,
  sendMoney,
  memberTransaction,
  memberData,
  directAcrual,
};
