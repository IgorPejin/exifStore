const express = require("express");
const exifr = require("exifr");

const exifStoreApp = express();

exifStoreApp.listen({ port: 8000 }, () => {
  // (async () =>
  //   console.log(
  //     await exifr.parse("test image", true)
  //   ))();
});
