import Joi from "joi";

export const createEvent = Joi.object({
  eventName: Joi.string().required(),
  description: Joi.string().required(),
  startDate: Joi.string().required(),
  dueDate: Joi.string().required(),
});

export const updateEvent = Joi.object({
  eventName: Joi.string(),
  description: Joi.string(),
  startDate: Joi.string(),
  dueDate: Joi.string(),
});