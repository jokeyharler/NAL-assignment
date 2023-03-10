import Joi from "joi";

module.exports.createUser = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports.requireAuthen = Joi.object({
  authorization: Joi.string().required(),
});