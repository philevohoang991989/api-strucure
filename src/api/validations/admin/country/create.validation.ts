import { Joi } from "express-validation";

export const CreateValidation = Joi.object({
  name: Joi.string().required(),
  zip_code: Joi.string(),
});
