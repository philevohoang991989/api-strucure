import { Joi } from "express-validation";

export const LoginValidation = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
