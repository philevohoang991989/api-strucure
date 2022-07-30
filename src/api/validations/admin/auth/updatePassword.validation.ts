import { Joi } from "express-validation";

export const UpdatePasswordValidation = Joi.object({
  old_password: Joi.string().required(),
  password: Joi.string().required(),
  password_confirm: Joi.string().required(),
});
