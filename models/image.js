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
      image_width: DataTypes.NUMBER,
      image_height: DataTypes.NUMBER,
      make: DataTypes.STRING,
      model: DataTypes.STRING,
      iso: DataTypes.STRING,
      exposure_time: DataTypes.NUMBER,
      ev: DataTypes.NUMBER,
      flash: DataTypes.BOOLEAN,
      f_number: DataTypes.NUMBER,
      date_time: DataTypes.DATE,
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
