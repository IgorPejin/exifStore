const express = require("express");

const appRest = express();

appRest.listen({ port: process.env.REST_ENDPOINT_PORT }, () => {
  console.log("exifStoreRest running...");
});
