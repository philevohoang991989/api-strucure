import { Joi } from "express-validation";

export const EditDistrictValidation = Joi.object({
  name: Joi.string().required(),
  zip_code: Joi.string(),
});
