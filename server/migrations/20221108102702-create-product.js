'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      img: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      salePrice: {
        type: Sequelize.INTEGER
      },
      salePct: {
        type: Sequelize.INTEGER
      },
      unit: {
        allowNull: false,
        type: Sequelize.STRING
      },
      weight: {
        allowNull: false,
        type: Sequelize.STRING
      },
      origin: {
        allowNull: false,
        type: Sequelize.STRING
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "user",
          key: "id"
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product');
  }
};