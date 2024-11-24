"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate({ Gallery }) {
      this.belongsTo(Gallery, { foreignKey: "gallery_id", as: "gallery" });
    }
  }
  Image.init(
    {
      image_name: DataTypes.STRING,
      image_width: DataTypes.NUMBER,
      image_height: DataTypes.NUMBER,
      image_path: DataTypes.STRING,
      make: DataTypes.STRING,
      model: DataTypes.STRING,
      iso: DataTypes.NUMBER,
      exposure_time: DataTypes.FLOAT,
      ev: DataTypes.FLOAT,
      flash: DataTypes.STRING,
      f_number: DataTypes.FLOAT,
      date_time: DataTypes.STRING,
      date_time_offset: DataTypes.STRING,
      gallery_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
