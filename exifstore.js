const express = require("express");

const exifStoreApp = express();

exifStoreApp.listen({ port: 8000 }, () => {
  console.log("Listening on port 8000...");
});
