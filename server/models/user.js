'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.product, {
        foreignKey: "userID"
      });
      user.hasMany(models.productLike, {
        foreignKey: "userID"
      });
      user.hasMany(models.productcart, {
        foreignKey: "userID"
      });
    }
  }
  user.init({
    userID: DataTypes.STRING,
    pw: DataTypes.STRING,
    nickname: DataTypes.STRING,
    tel: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    auth: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    modelName: 'user',
  });
  return user;
};