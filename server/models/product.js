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
      this.belongsTo(models.user, {
        as: "user",
        foreignKey: "userID",
        onDelete: "CASCADE"
      });
    }
  }
  product.init({
    img: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    salePrice: DataTypes.INTEGER,
    salePct: DataTypes.INTEGER,
    unit: DataTypes.STRING,
    weight: DataTypes.STRING,
    origin: DataTypes.STRING,
    category: DataTypes.STRING,
    content: DataTypes.STRING,
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: 'product',
  });
  return product;
};