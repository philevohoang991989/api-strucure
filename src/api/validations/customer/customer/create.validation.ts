import { Joi } from "express-validation";

export const CreateValidation = Joi.object({
  cus_code: Joi.string().empty(),
  customer_group_id: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  password_confirm: Joi.string().required(),
  avatar: Joi.string().empty(""),
  fullname: Joi.string().required(),
  email: Joi.string().required(),
  status: Joi.string().empty(""),
});
