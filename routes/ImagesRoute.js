const express = require("express");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const fs = require("fs");
const path = require("path");
const fileupload = require("express-fileupload");
const exifr = require("exifr");
const sizeOf = require("image-size");
require("dotenv").config();

const { Image } = require("../models");
const calculateEV = require("../utils/math/math");
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

route.delete("/imageDelete?:id", auth, async (req, res) => {
  const imageID = req.query.id;
  const image_name = req.query.name;
  const userId = req.user.id;
  const selectedGalleryId = req.body.selectedGalleryId;

  let imagePath;

  if (!selectedGalleryId) {
    imagePath =
      path.join(__dirname, "..") + `/storage/g${userId}/${image_name}`;
  } else {
    imagePath =
      path.join(__dirname, "..") +
      `/storage/g${userId}/g${selectedGalleryId}/${image_name}`;
  }

  Image.destroy({ where: { id: imageID } })
    .then(async (row) => {
      const deletedImage = await fs.promises.rm(imagePath);
      res
        .status(200)
        .json({ msg: "Sucessfully deleted image\n " + deletedImage });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Failed to delete image" });
    });
});

route.post("/imageUpload?:selectedGalleryId", auth, async (req, res) => {
  let id = parseInt(req.query.selectedGalleryId);
  const userId = req.user.id;
  const files = req.files;
  const image = files.file;

  //todo: TO FIX CRASHES PARSE THE PATH SO THAT U COVER ALL CASES
  // or check if the image already exists and make a copy
  const imageName = image.name;
  let filePath;
  let storagePath;
  try {
    if (id === 0) {
      storagePath = `storage/g${userId}/${imageName}`;
      filePath = path.join(__dirname, "..") + "/" + storagePath;
      id = null;
    } else {
      storagePath = `storage/g${userId}/g${id}/${imageName}`;
      filePath = path.join(__dirname, "..") + "/" + storagePath;
    }

    const file = await fs.promises.appendFile(filePath, image.data);
    console.log(file);
    const buffer = await fs.promises.readFile(filePath);
    const base64Image = Buffer.from(buffer).toString("base64");
    const exifDataPicked = await exifr.parse(filePath, {
      pick: [
        "Make",
        "Model",
        "ISO",
        "ExposureTime",
        "Flash",
        "FNumber",
        "DateTimeOriginal",
        "OffsetTimeOriginal",
        "ShutterSpeedValue",
        "ApertureValue",
      ],
    });

    const exifData = exifDataPicked
      ? Object.fromEntries(
          Object.entries(exifDataPicked).map(([key, value]) => [
            key,
            value ?? "unknown",
          ])
        )
      : undefined;

    let newImage;
    const dimensions = sizeOf(image.data);

    if (exifData) {
      const ev = calculateEV(exifData.FNumber, exifData.ExposureTime);
      const date = exifData.DateTimeOriginal.toISOString().split("T")[0];
      newImage = {
        image_name: imageName,
        image_width: dimensions.width,
        image_height: dimensions.height,
        image_path: storagePath,
        make: exifData.Make,
        model: exifData.Model,
        iso: exifData.ISO,
        exposure_time: exifData.ExposureTime,
        ev: ev,
        flash: exifData.Flash,
        f_number: exifData.FNumber,
        date_time: date,
        date_time_offset: exifData.OffsetTimeOriginal,
        gallery_id: id,
        user_id: userId,
      };
    } else {
      newImage = {
        image_name: imageName,
        image_width: dimensions.width,
        image_height: dimensions.height,
        image_path: storagePath,
        make: "unknown",
        model: "unknown",
        iso: null,
        exposure_time: null,
        ev: null,
        flash: null,
        f_number: null,
        date_time: "unknown",
        date_time_offset: "unknown",
        gallery_id: id,
        user_id: userId,
      };
    }

    Image.create(newImage)
      .then((row) => {
        res.json({ ...row.dataValues, image_buffer: base64Image });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  } catch (error) {
    console.error(`Error while writing file: ${filePath}`, error);
  }
});

function filterImages(images, filterParams) {
  if (!filterParams.filterActivated) {
    return images;
  } else {
    const filterKeys = Object.keys(filterParams).filter(
      (key) => key !== "filterActivated"
    );

    return images.filter((image) =>
      filterKeys.every((key) => image[key] === filterParams[key])
    );
  }
}

async function processImages(rows, plimit, currentPage, filterParams) {
  const start = (currentPage - 1) * plimit;
  const end = start + plimit;
  const filteredImages = filterImages(rows, filterParams);
  const totalPages = Math.ceil(filteredImages.length / plimit);
  const imagePromises = filteredImages.slice(start, end).map(async (record) => {
    try {
      const buffer = await fs.promises.readFile(`./${record.image_path}`);
      const thumbnail = await exifr.thumbnail(buffer);

      const base64Image = Buffer.from(buffer).toString("base64");
      let thumbnailBase64;
      if (thumbnail) thumbnailBase64 = thumbnail.toString("base64");
      else thumbnailBase64 = base64Image;

      return {
        ...record,
        image_buffer: base64Image,
        image_thumbnail: thumbnailBase64,
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

route.post("/imagesForGallery?:query", auth, async (req, res) => {
  const id = req.query.id;
  const plimit = req.query.plimit;
  const currentPage = req.query.currentPage;
  const filterParams = req.body;

  if (id != 0) {
    Image.findAll({ raw: true, nest: true, where: { gallery_id: id } })
      .then((rows) =>
        processImages(
          rows,
          parseInt(plimit),
          parseInt(currentPage),
          filterParams
        )
      )
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err));
  } else {
    Image.findAll({ raw: true, nest: true })
      .then((rows) =>
        processImages(
          rows,
          parseInt(plimit),
          parseInt(currentPage),
          filterParams
        )
      )
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json(err));
  }
});

module.exports = route;
