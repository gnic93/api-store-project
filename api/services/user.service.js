const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class UserService {
  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find(query) {
    const options = {
      include: ['customer']
    }
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    const users = await models.User.findAll(options);
    return users;
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
