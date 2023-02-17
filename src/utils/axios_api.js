const axios = require("axios");
const CryptoJS = require("crypto-js");
require("dotenv").config();

exports.hit_request = async (method, url, body, header) => {
  try {
    const res = await axios({
      method: method,
      url: url,
      data: body,
      headers: header,
    });
    // console.log(res.response);
    return res;
  } catch (err) {
    throw new Error(JSON.stringify(err?.response?.data));
  }
};
