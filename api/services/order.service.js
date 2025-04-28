const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {

  constructor(){
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const { orderId, productId, amount } = data;
    if (productId.length !== amount.length) {
      throw new Error("productId y amount deben tener la misma longitud.");
    }
    const items = productId.map((id, index) => ({
      orderId,
      productId: id,
      amount: amount[index],
    }));
  // Usar bulkCreate para insertar múltiples registros
    const newItem = await models.OrderProduct.bulkCreate(items);
    return newItem;
  }

  async find(query) {
    const options = {
      include: ['customer', 'items']
    }
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit,
      options.offset = offset
    }
    const orders = await models.Order.findAll(options);
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
        association: 'customer',
        include: ['user']
        },
        'items'
      ]
    });
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    const updatedOrder = await order.update(changes);
    return updatedOrder;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { id };
  }

}

module.exports = OrderService;
