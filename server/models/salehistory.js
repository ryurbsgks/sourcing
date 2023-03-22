'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class saleHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  saleHistory.init({
    productID: DataTypes.INTEGER,
    seller: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    merchant_uid: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: 'saleHistory',
  });
  return saleHistory;
};