import { Joi } from "express-validation";

export const CreateValidation = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  password_confirm: Joi.string().required(),
  avatar: Joi.string().empty(""),
  fullname: Joi.string().required(),
  group_id: Joi.number().required(),
  email: Joi.string().required(),
  status: Joi.string().required(),
});
