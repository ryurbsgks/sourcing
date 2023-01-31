'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productcart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      productcart.belongsTo(models.user, {
        foreignKey: "userID",
        onDelete: "CASCADE"
      });
      productcart.belongsTo(models.product, {
        foreignKey: "productID",
        onDelete: "CASCADE"
      });
    }
  }
  productcart.init({
    userID: DataTypes.INTEGER,
    productID: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: 'productcart',
  });
  return productcart;
};