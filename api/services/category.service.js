const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CategoryService {

  constructor() {}

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find({ limit, offset }) {
    const options = {};
    if (limit) {
      options.limit = limit;
    }
    if (offset) {
      options.offset = offset;
    }
    const categories = await models.Category.findAll(options);
    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products'],
    });
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    const updatedCategory = await category.update(changes);
    return updatedCategory;
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { id };
  }

}

module.exports = CategoryService;
