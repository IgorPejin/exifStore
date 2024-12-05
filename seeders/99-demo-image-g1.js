"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Images",
      [
        {
          image_name: "IMG_8735",
          image_width: 5932,
          image_height: 3809,
          image_path: "storage/g1/IMG_8735.JPG",
          make: "Canon",
          model: "Canon EOS 250D",
          iso: 100,
          exposure_time: 0.001,
          ev: 6.60964,
          flash: "Flash did not fire.",
          f_number: 3.2,
          date_time: "2023-06-20T13:02:03.000Z",
          date_time_offset: "+02:00",
          gallery_id: 0,
          user_id: 1,
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Images", null, {});
  },
};
