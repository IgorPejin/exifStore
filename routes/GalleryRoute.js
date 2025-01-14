const express = require("express");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const { Gallery } = require("../models");

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

route.put("/updateGalleryById?:id", auth, (req, res) => {
  // object here to pass in update method when u decide to do thumbnails
  Gallery.update(
    {
      name: req.body.newGalleryName,
    },
    { where: { id: req.query.id } }
  )
    .then((row) => {
      res.status(200).json({ msg: "Sucess" });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Failed" });
    });
});

route.delete("/deleteGalleryById?:id", auth, async (req, res) => {
  const userId = req.user.id;
  const galleryId = parseInt(req.query.id);

  Gallery.destroy({ where: { id: galleryId } })
    .then(async (row) => {
      const galleryPath =
        path.join(__dirname, "..") + `/storage/g${userId}/g${req.query.id}`;
      await fs.promises.rm(galleryPath, { recursive: true });
      res.status(200).json({ msg: "Sucess" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Failed" });
    });
});

route.post("/addNewGallery", auth, (req, res) => {
  const userId = req.user.id;

  const newGallery = {
    name: req.body.newGalleryName,
    description: "",
    thumbnail_ref: undefined,
    user_id: userId,
  };

  Gallery.create(newGallery)
    .then(async (row) => {
      const galleryPath =
        path.join(__dirname, "..") +
        `/storage/g${userId}/g${row.dataValues.id}`;
      await fs.promises.mkdir(galleryPath);
      res.json(row);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

route.get("/galleriesForUser", auth, (req, res) => {
  const userId = req.user.id;
  Gallery.findAll({
    attributes: [
      "id",
      "name",
      "description",
      "thumbnail_ref",
      "createdAt",
      "updatedAt",
    ],
    where: { user_id: userId },
  })
    .then((rows) => res.json(rows))
    .catch((err) => res.status(500).json(err));
});

module.exports = route;
