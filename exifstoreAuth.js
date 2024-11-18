const express = require("express");
const { sequelize, User } = require("./models");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const cors = require("cors");
require("dotenv").config();

const appAuth = express();
var corsOptions = {
  origin: [`http://localhost:5200`],
  optionsSuccessStatus: 200,
};

appAuth.use(express.json());
appAuth.use(cors(corsOptions));

appAuth.post("/register", (req, res) => {
  const joi = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  };

  const schema = Joi.object({
    username: Joi.string().alphanum().min(2).max(16).required(),
    password: Joi.string().min(10).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "rs"] },
    }),
  });

  const { error, value } = schema.validate({
    username: joi.username,
    password: req.body.password,
    email: joi.email,
  });

  if (error) {
    res.status(400).json({ msg: "" + error.message });
  } else {
    User.create(joi)
      .then((rows) => {
        const usr = {
          id: rows.id,
          username: rows.username,
          password: rows.password,
          email: rows.email,
        };

        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);

        res.json({ token: token });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
});

// todo: make where statement compare case sensitive

appAuth.post("/login", (req, res) => {
  User.findOne({ where: { username: req.body.username } })
    .then((usr) => {
      if (bcrypt.compareSync(req.body.password, usr.password)) {
        const obj = {
          id: usr.id,
          username: usr.username,
          password: usr.password,
          email: usr.email,
        };

        const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);

        res.json({ token: token, email: obj.email });
      } else {
        res.status(400).json({ msg: "Invalid credentials" });
      }
    })
    .catch((err) => {
      res.status(400).json({ msg: "No user in database" });
    });
});

appAuth.listen({ port: process.env.AUTH_SERVER_PORT }, async () => {
  await sequelize.authenticate();
  console.log("exifstoreAuth running...");
});
