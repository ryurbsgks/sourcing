'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orderHistory.init({
    userID: DataTypes.INTEGER,
    merchant_uid: DataTypes.STRING,
    imp_uid: DataTypes.STRING,
    productData: DataTypes.STRING,
    status: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    cancel_amount: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: 'orderHistory',
  });
  return orderHistory;
};