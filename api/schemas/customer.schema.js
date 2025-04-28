const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string().min(3).max(30);
const phone = Joi.string().min(10).max(15);
const email = Joi.string().email();
const password = Joi.string();
const userId = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone,
  user: Joi.object({
    email: email.required(),
    password: password.required()
  })
});

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  userId: userId
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const queryCustomerSchema = Joi.object({
  limit: limit,
  offset: offset
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema, queryCustomerSchema };
