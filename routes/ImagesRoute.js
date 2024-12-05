const express = require("express");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const fs = require("fs");
const path = require("path");
const fileupload = require("express-fileupload");
const exifr = require("exifr");
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

route.post("/imageUpload?:id", auth, async (req, res) => {
  let id = parseInt(req.query.id);
  const userId = req.user.id;
  const files = req.files;
  const image = files.image;
  const imageName = image.name;
  const confirm = req.body.confirm;

  let filePath;
  let storagePath;

  try {
    if (confirm && id === 0) {
      storagePath = `storage/g${userId}/${imageName}`;
      filePath = path.join(__dirname, "..") + "/" + storagePath;
      id = null;
    } else {
      storagePath = `storage/g${userId}/g${id}/${imageName}`;
      filePath = path.join(__dirname, "..") + "/" + storagePath;
    }

    await fs.promises.appendFile(filePath, image.data);

    const exifData = await exifr.parse(filePath, {
      pick: [
        "Make",
        "Model",
        "ISO",
        "ExposureTime",
        "Flash",
        "FNumber",
        "DateTimeOriginal",
        "OffsetTimeOriginal",
      ],
    });

    const newImage = {
      image_name: imageName,
      image_width: 0,
      image_height: 0,
      image_path: storagePath,
      make: exifData.Make,
      model: exifData.Model,
      iso: exifData.ISO,
      exposure_time: exifData.ExposureTime,
      ev: 0,
      flash: exifData.Flash,
      f_number: exifData.FNumber,
      date_time: exifData.DateTimeOriginal.toISOString(),
      date_time_offset: exifData.OffsetTimeOriginal,
      gallery_id: id,
      user_id: userId,
    };
    Image.create(newImage)
      .then((row) => {
        res.json(row);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (error) {
    console.error(`Error while writing file: ${filePath}`, error);
  }
});

async function processImages(rows, plimit, currentPage) {
  const start = (currentPage - 1) * plimit;
  const end = start + plimit;
  const totalPages = Math.ceil(rows.length / plimit);

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

  if (id != 0) {
    Image.findAll({ raw: true, nest: true, where: { gallery_id: id } })
      .then((rows) =>
        processImages(rows, parseInt(plimit), parseInt(currentPage))
      )
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err));
  } else {
    Image.findAll({ raw: true, nest: true })
      .then((rows) =>
        processImages(rows, parseInt(plimit), parseInt(currentPage))
      )
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err));
  }
});

module.exports = route;
