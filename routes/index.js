const express = require("express");
const router = express.Router();
// // User model
const User = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

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
  // const name = req.body.username;
  // const surname = req.body.surname;
  // const password = req.body.password;
  const { username, surname, email, nationality, password } = req.body;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  if (
    username === "" ||
    surname === "" ||
    email === "" ||
    nationality === "" ||
    password === ""
  ) {
    console.log(1);
    res.render("signup.hbs", {
      errorMessage: "Fill all the fields to sign up!"
    });
    return;
  }

  User.findOne({ email }).then(user => {
    if (user !== null) {
      res.render("signup.hbs", {
        errorMessage: "The email already exists!"
      });
      console.log(2);
      return;
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    User.create({
      username,
      surname,
      email,
      nationality,
      password: hashPass
    })
      .then(userData => {
        // console.log(signedup);
        res.redirect("/login");
        console.log(userData);
      })
      .catch(err => console.log(err));
  });
});

module.exports = router;
