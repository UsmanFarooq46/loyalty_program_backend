const joi = require("@hapi/joi");

const loginValidation = (data) => {
  const schema = joi.object({
    userName: joi.string().required(),
    password: joi.string().required(),
  });
  return schema.validate(data);
};

const forgotPassValidations = (data) => {
  const schema = joi.object({
    userName: joi.string().required(),
    email: joi.string().email(),
    newPass: joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = {
  loginValidation,
  forgotPassValidations,
};
