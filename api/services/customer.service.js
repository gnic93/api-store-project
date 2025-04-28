const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {
  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    });
    return newCustomer
  }

  async find(query) {
    const options = {
      include: ['user']
    }
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit,
      options.offset = offset
    }
    const customers = await models.Customer.findAll(options);
    return customers;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id, {
      include: ['user'],
    });
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const updatedCustomer = await customer.update(changes);
    return updatedCustomer;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;
