class error_resp extends Error {
  constructor(completeError, custome_message, statusCode) {
    super();
    console.log("test>>>>>>>>>>>>>>>>>");
    this.completeError = completeError;
    this.statusCode = statusCode;
    this.custome_message = custome_message;
  }
}

module.exports = error_resp;
