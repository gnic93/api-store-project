const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const productId = Joi.array().items(Joi.number().integer());
const orderId = Joi.number().integer();
const amount = Joi.array().items(Joi.number().integer().min(1));

const limit = Joi.number().integer();
const offset = Joi.number().integer();


const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});

const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required()
});

const updateOrderSchema = Joi.object({
  customerId: customerId,
});

const getOrderSchema = Joi.object({
  id: id.required()
});

const queryOrderSchema = Joi.object({
  limit: limit,
  offset: offset
});

module.exports = { createOrderSchema, addItemSchema, getOrderSchema, updateOrderSchema, queryOrderSchema };
