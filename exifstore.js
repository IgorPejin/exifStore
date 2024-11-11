const express = require("express");
const exifr = require("exifr");

const exifStoreApp = express();

exifStoreApp.listen({ port: process.env.EXIF_APP_PORT }, () => {
  console.log("exifStore running...");
  // (async () =>
  //   console.log(await exifr.parse("test", true)))();
});
