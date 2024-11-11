"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Galleries",
      [
        {
          name: "ipejin's images",
          description: "All your images in one place!",
          thumbnail_ref: undefined,
          user_id: 1,
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Galleries", null, {});
  },
};
