const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5);
const customerId = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
  customerId: customerId
});

const updateUserSchema = Joi.object({
  email: email,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const queryUserSchema = Joi.object({
  limit: limit,
  offset: offset
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema, queryUserSchema }
