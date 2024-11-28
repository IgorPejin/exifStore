const express = require("express");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
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

route.post("/addNewGallery", auth, (req, res) => {
  const userId = req.user.id;

  const newGallery = {
    name: req.body.newGalleryName,
    description: "",
    thumbnail_ref: undefined,
    user_id: userId,
  };
  Gallery.create(newGallery)
    .then((row) => {
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
