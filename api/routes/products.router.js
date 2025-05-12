const express = require('express');
const passport = require('passport');

const ProductService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('./../middlewares/auth.handler');

const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductService();

router.get('/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res) => {
  const { id } = req.params;
  const product = await service.findOne(id);
  res.json(product);
});

router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'seller'),
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'seller'),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'seller'),
  validatorHandler(getProductSchema, 'params'),
  async (req, res) => {
  try {
    const { id } = req.params;
    const respuesta = await service.delete(id);
    res.json(respuesta);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

module.exports = router;
