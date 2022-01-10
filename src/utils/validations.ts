import Joi from 'joi'

export const registerUserValidation = (data: any): Joi.ValidationResult =>
  Joi.object({
    name: Joi.string().min(6).required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
  }).validate(data)
