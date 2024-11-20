const express = require("express");

const galleries = require("./routes/GalleryRoute");
const images = require("./routes/ImagesRoute");
const { sequelize } = require("./models");

const cors = require("cors");
require("dotenv").config();

const appRest = express();
var corsOptions = {
  origin: [`http://localhost:5200`],
  optionsSuccessStatus: 200,
};

appRest.use(express.json());
appRest.use(cors(corsOptions));

appRest.use("/exifstore", galleries);
appRest.use("/exifstore", images);

appRest.listen({ port: process.env.REST_ENDPOINT_PORT }, async () => {
  await sequelize.authenticate();
  console.log("exifStoreRest running...");
});
