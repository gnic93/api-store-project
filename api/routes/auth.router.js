const express = require('express');
const passport = require('passport');
const validatorHandler = require('./../middlewares/validator.handler');
const { loginSchema, recoverySchema, changePasswordSchema } = require('./../schemas/auth.schema');

const AuthService = require('./../services/auth.service');
const service = new AuthService();
const router = express.Router();

router.post('/login',
  validatorHandler(loginSchema, 'body'),
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
  try {
    const user = req.user;
    res.json(service.signToken(user));
  } catch (error) {
    next(error);
  }
});

router.post('/recovery',
  validatorHandler(recoverySchema, 'body'),
  async (req, res, next) => {
  try {
    const { email } = req.body;
    const response = await service.sendRecovery(email);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post('/change-password',
  validatorHandler(changePasswordSchema, 'body'),
  async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const response = await service.changePassword(token, newPassword);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
