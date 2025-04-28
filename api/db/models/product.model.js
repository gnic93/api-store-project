const { Model, DataTypes, Sequelize} = require('sequelize');

const { CATEGORY_TABLE } = require('./category.model');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // categoryName: {
  //   allowNull: false,
  //   type: DataTypes.STRING,
  // },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  }
}

class Product extends Model {
  static associate(models) {
    // Un producto pertenece a una categoría
    this.belongsTo(models.Category, { as: 'category' });

    // Un producto puede estar en muchas órdenes
    this.belongsToMany(models.Order, {
      through: 'OrderProducts',
      as: 'orders',
      foreignKey: 'productId',
      otherKey: 'orderId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product };
