const Joi = require("joi");
//
const SUBSCRIPTION_OPTIONS = ["starter", "pro", "business"];
//
const addingSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});
//
const updatingSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});
//
const updatingStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
//
const updatingSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...SUBSCRIPTION_OPTIONS)
    .required(),
}).unknown(false);
//
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
//
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const contactsSchemas = {
  addingSchema,
  updatingSchema,
  updatingStatusSchema,
};
const userSchemas = {
  loginSchema,
  registerSchema,
  updatingSubscriptionSchema,
};
module.exports = {
  contactsSchemas,
  userSchemas,
  SUBSCRIPTION_OPTIONS,
};
