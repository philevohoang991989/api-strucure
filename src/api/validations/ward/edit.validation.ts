import { Joi } from "express-validation";

export const EditWardValidation = Joi.object({
  name: Joi.string().required(),
  zip_code: Joi.string(),
});
