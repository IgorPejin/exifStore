"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Images",
      [
        {
          image_name: "IMG_7124",
          image_width: 3562,
          image_height: 5343,
          image_path: "storage/g2/IMG_8808.JPG",
          make: "Canon",
          model: "Canon EOS 250D",
          iso: 200,
          exposure_time: 0.00125,
          ev: 4.673002,
          flash: "Flash did not fire.",
          f_number: 5.6,
          date_time: "2024-07-20T09:29:30.000Z",
          date_time_offset: "+02:00",
          gallery_id: 2,
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Images", null, {});
  },
};
