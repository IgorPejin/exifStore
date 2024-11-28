const express = require("express");
const exifr = require("exifr");

const exifStoreApp = express();

exifStoreApp.listen({ port: process.env.EXIF_APP_PORT }, () => {
  console.log("exifStore running...");
  // (async () => {
  //   console.log(await exifr.parse("storage/g1/IMG_4369.JPG")); // 2022 04 15
  //   console.log(await exifr.parse("storage/g1/IMG_7062.JPG")); //2023 06 20
  // })();
});
