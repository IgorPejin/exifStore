"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Galleries",
      [
        {
          name: "Stefan's images",
          description: "All your images in one place!",
          thumbnail_ref: undefined,
          user_id: 2,
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Galleries", null, {});
  },
};
