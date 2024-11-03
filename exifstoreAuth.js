const express = require("express");
const { User } = require("./models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const cors = require("cors");
require("dotenv").config();

const app = express();
var corsOptions = {
  origin: [`http://localhost:5200`],
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

app.post("/register", (req, res) => {
  const joi = {
    username: req.body.credentials.username,
    email: req.body.credentials.email,
    password: bcrypt.hashSync(req.body.credentials.password, 10),
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
    password: req.body.credentials.password,
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

app.post("/login", (req, res) => {
  User.findOne({ where: { username: req.body.credentials.username } })
    .then((usr) => {
      if (bcrypt.compareSync(req.body.credentials.password, usr.password)) {
        const obj = {
          id: usr.id,
          username: usr.username,
          password: usr.password,
          email: usr.email,
        };

        const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);

        res.json({ token: token, user_type: obj.user_type });
      } else {
        res.status(400).json({ msg: "Invalid credentials" });
      }
    })
    .catch((err) => {
      res.status(400).json({ msg: "No user in database" });
    });
});

app.listen({ port: process.env.AUTH_SERVER_PORT }, () => {
  console.log("exifstoreAuth running...");
});
