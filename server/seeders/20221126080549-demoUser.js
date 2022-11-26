'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("user", [{
      id: 1,
      userID: "master5114",
      pw: "master5114",
      nickname: "master",
      tel: "01000000000",
      auth: 3
    }, {
      id: 2,
      userID: "ryurbsgks",
      pw: "rndus0324",
      nickname: "테스트 판매자",
      tel: "01051144396",
      auth: 2
    }, {
      id: 3,
      userID: "guyeon",
      pw: "rndus0324",
      nickname: "guyeon",
      tel: "01034534396",
      auth: 1
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('user', null, {});
  }
};
