'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('productLike', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "user",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      productID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "product",
          key: "id"
        },
        onDelete: "CASCADE"
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('productLike');
  }
};