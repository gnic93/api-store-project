const Joi = require('joi');

const email = Joi.string().email().required();
const password = Joi.string().min(8).required();
const token = Joi.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/).required(); // Validación más estricta para JWT
const newPassword = Joi.string().min(8).required();


const loginSchema = Joi.object({
  email,
  password
});

const recoverySchema = Joi.object({
  email,
});

const changePasswordSchema = Joi.object({
  token,
  newPassword
});

module.exports = { loginSchema, recoverySchema, changePasswordSchema };
