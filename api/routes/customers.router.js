const express = require('express');
const passport = require('passport');

const CustomerService = require('../services/customer.service');
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('./../middlewares/auth.handler');

const { createCustomerSchema, updateCustomerSchema, getCustomerSchema, queryCustomerSchema } = require('../schemas/customer.schema');

const router = express.Router();
const service = new CustomerService();

router.get('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(queryCustomerSchema, 'query'),
  async (req, res, next) => {
  try {
    const customers = await service.find(req.query);
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', {session: false}),
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const customer = await service.update(id, body);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
