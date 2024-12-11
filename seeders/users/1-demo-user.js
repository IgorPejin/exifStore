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
            "$2b$10$fNWvdFFK4IhYNH/e5v26o.w7MJBTNQQLwXR8JCG9caBr6oxMSMB8m", // adminadmin123
          email: "exampleEmail@email.com",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
