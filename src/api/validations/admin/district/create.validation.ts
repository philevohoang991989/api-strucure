import { Joi } from "express-validation";

export const CreateDistrictValidation = Joi.object({
  name: Joi.string().required(),
  country_id: Joi.number().required(),
  zip_code: Joi.string(),
});
