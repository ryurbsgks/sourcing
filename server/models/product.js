'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product.init({
    category: DataTypes.INTEGER,
    pic: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    saleInfo: DataTypes.INTEGER,
    salePrice: DataTypes.INTEGER,
    unit: DataTypes.STRING,
    weight: DataTypes.STRING,
    origin: DataTypes.STRING,
    info: DataTypes.STRING
  }, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: 'product',
  });
  return product;
};