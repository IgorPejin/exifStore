"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "Stefan",
          password:
            "$2b$10$To/ZsgrNd0W23yazvh9B1uFk/Pv2ooVNDSQyyIUEKrHc8qHEU3hpG", //stefanstefan123
          email: "notreallystefan@somemail.com",
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
