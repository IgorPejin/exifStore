const express = require("express");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
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

//todo: add src field to image so that u can use fs to get image data
route.get("/imagesForGallery?:id", auth, async (req, res) => {
  const id = req.query.id;
  const userId = req.user.id;
  Image.findAll({ where: { gallery_id: id } })
    .then((rows) => res.json(rows))
    .catch((err) => res.status(500).json(err));
});

module.exports = route;