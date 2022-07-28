import { Joi } from "express-validation";

export const LanguageValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
});
