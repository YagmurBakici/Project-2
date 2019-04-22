const express = require("express");
const router = express.Router();
// // User model
const User = require("../models/user");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/login", (req, res, next) => {
  res.render("login.hbs");
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  User.create({ username, password })
    .then(logged => {
      console.log(logged);
      res.redirect("/home");
    })
    .catch(err => next(err));
});

router.get("/signup", (req, res, next) => {
  res.render("signup.hbs");
});

router.post("/signup", (req, res, next) => {
  const { name, surname, newpassword } = req.body;
  User.create({ name, surname, newpassword })
    .then(signedup => {
      console.log(signedup);
      res.redirect("/login");
    })
    .catch(err => next(err));
});

module.exports = router;
