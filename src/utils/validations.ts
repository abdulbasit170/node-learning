import Joi from 'joi'

const nameSchema = Joi.string().min(6)
const usernameSchema = Joi.string().alphanum().min(3).max(30)
const passwordSchema = Joi.string().min(6).max(20)

export const registerUserValidation = (data: any): Joi.ValidationResult =>
  Joi.object({
    name: nameSchema.required(),
    username: usernameSchema.required(),
    password: passwordSchema.required()
  }).validate(data)

export const updateUserValidation = (data: any): Joi.ValidationResult =>
  Joi.object({
    name: nameSchema,
    username: usernameSchema,
    password: passwordSchema
  }).validate(data)

export const todoValidation = (data: any): Joi.ValidationResult =>
  Joi.object({
    value: nameSchema.required()
  }).validate(data)

export const loginUserValidation = (data: any): Joi.ValidationResult =>
  Joi.object({
    username: usernameSchema.required(),
    password: passwordSchema.required()
  }).validate(data)
