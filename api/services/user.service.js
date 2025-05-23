const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const bcrypt = require('bcrypt');

class UserService {
  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async find(query) {
    const options = {
      include: ['customer'],
      attributes: { exclude: ['password'] }
    }
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    const users = await models.User.findAll(options);
    return users;
  }

  async findByEmail(email) {
    const response = await models.User.findOne({
      where: { email }
    });
    return response;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found.');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const updatedUser = await user.update(changes);
    return updatedUser;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
