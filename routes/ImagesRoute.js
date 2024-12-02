const express = require("express");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const fs = require("fs");
const fileupload = require("express-fileupload");
require("dotenv").config();

const { Image } = require("../models");
const route = express.Router();
route.use(express.json());
route.use(fileupload());
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

route.post("/imageUpload?:id", auth, (req, res) => {
  const id = req.query.id;
  const userId = req.user.id;
  const file = req.files;
  console.log(file.image, userId, file);
  //todo process uploaded image
});

async function processImages(rows, plimit, currentPage) {
  const start = (currentPage - 1) * plimit;
  const end = start + plimit;
  const totalPages = rows.length / plimit;

  const imagePromises = rows.slice(start, end).map(async (record) => {
    try {
      const buffer = await fs.promises.readFile(`./${record.image_path}`);
      const base64Image = Buffer.from(buffer).toString("base64");
      return {
        ...record,
        image_buffer: base64Image,
      };
    } catch (error) {
      console.error(`Error reading file: ${record.image_path}`, error);
      return null;
    }
  });

  const images = await Promise.all(imagePromises);

  return { count: totalPages, images: images.reverse() }; // lifo
  ///return images.filter((img) => img !== null);
}

route.get("/imagesForGallery?:query", auth, async (req, res) => {
  const id = req.query.id;
  const plimit = req.query.plimit;
  const currentPage = req.query.currentPage;
  Image.findAll({ raw: true, nest: true, where: { gallery_id: id } })
    .then((rows) =>
      processImages(rows, parseInt(plimit), parseInt(currentPage))
    )
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

module.exports = route;
