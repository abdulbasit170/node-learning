import Joi from 'joi'

export const registerUserValidation = (data: any): Joi.ValidationResult =>
  Joi.object({
    name: Joi.string().min(6).required(),
    username: Joi.string().alphanum().min(3).max(30).required()
  }).validate(data)

export const updateUserValidation = (data: any): Joi.ValidationResult =>
  Joi.object({
    name: Joi.string().min(6),
    username: Joi.string().alphanum().min(3).max(30)
  }).validate(data)

export const todoValidation = (data: any): Joi.ValidationResult =>
  Joi.object({
    value: Joi.string().min(6).required()
  }).validate(data)
