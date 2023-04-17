const Joi = require("joi");
//

const addingSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});
const updatingSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});
const updatingStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
module.exports = {
  addingSchema,
  updatingSchema,
  updatingStatusSchema,
};
