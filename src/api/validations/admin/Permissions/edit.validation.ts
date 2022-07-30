import { Joi } from "express-validation";

export const CreateValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  group: Joi.string().required(),
  action: Joi.string().required(),
});
