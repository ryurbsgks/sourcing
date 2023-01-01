'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      productLike.belongsTo(models.user, {
        foreignKey: "userID",
        onDelete: "CASCADE"
      });
      productLike.belongsTo(models.product, {
        foreignKey: "productID",
        onDelete: "CASCADE"
      });
    }
  }
  productLike.init({
    userID: DataTypes.INTEGER,
    productID: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: 'productLike',
  });
  return productLike;
};