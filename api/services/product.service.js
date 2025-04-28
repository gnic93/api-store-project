const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const { Op } = require('sequelize');

class ProductService {
  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    }
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = parseInt(limit, 10);
      options.offset = parseInt(offset, 10);
    }

    const { price, price_min, price_max } = query;
    if (price) {
      options.where.price = price;
    } else if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: parseFloat(price_min),
        [Op.lte]: parseFloat(price_max),
      };
    } else if (price_max) {
      options.where.price = price_max;
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found.');
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const updatedProduct = await product.update(changes);
    return updatedProduct;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }
}

module.exports = ProductService;
