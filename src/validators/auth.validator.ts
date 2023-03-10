import Joi from "joi";

export const authenticate = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const requireAuthen = Joi.object({
  authorization: Joi.string().required(),
});