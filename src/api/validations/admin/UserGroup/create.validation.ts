import {Joi} from "express-validation";

export const CreateValidation = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    permission: Joi.array()
})