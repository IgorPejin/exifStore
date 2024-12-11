const express = require("express");
const exifr = require("exifr");

const exifStoreApp = express();

exifStoreApp.listen({ port: process.env.EXIF_APP_PORT }, () => {
  console.log("exifStore running...");
  (async () => {
    // const filePath = "";
    // const exifData = await exifr.parse(filePath, {
    //   pick: [
    //     "Make",
    //     "Model",
    //     "ISO",
    //     "ExposureTime",
    //     "Flash",
    //     "FNumber",
    //     "DateTimeOriginal",
    //     "OffsetTimeOriginal",
    //     "ShutterSpeedValue",
    //     "ApertureValue",
    //   ],
    // });
    // console.log(exifData);
  })();
});
