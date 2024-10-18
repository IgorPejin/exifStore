"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "ipejin",
          password:
            "$2b$12$5QF/CJcDGEe1SdG6iRyfKOcL1Rh2Cn76SSSIgrDCFoEG26K02p2H.",
          email: "exampleEmail@email.com",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
