import { Joi } from "express-validation";

export const CreateWardValidation = Joi.object({
  name: Joi.string().required(),
  district_id: Joi.number().required(),
  zip_code: Joi.string(),
});
