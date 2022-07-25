import { Joi } from "express-validation";

export const CreateValidation = Joi.object({
  permission_id: Joi.number().required(),
  user_id: Joi.number().required(),
});
