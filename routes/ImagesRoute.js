const express = require("express");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const fs = require("fs");
require("dotenv").config();

const { Image } = require("../models");
const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401).json({ msg: err });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ msg: err });

    req.user = user;

    next();
  });
}

async function parseImagesData(rows) {
  const imagesData = rows.map((record) => {
    const file = fs.readFileSync(record.image_path);
    const fileBuffer = Buffer.from(file);
    return { ...record, image_buffer: fileBuffer };
  });
  return imagesData;
}

route.get("/imagesForGallery?:id", auth, async (req, res) => {
  const id = req.query.id;
  Image.findAll({ raw: true, nest: true, where: { gallery_id: id } })
    .then(async (rows) => {
      const images = await parseImagesData(rows);
      res.json(images);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = route;
