const express = require("express"); // import express in this module
const adminRouter = new express.Router(); // create an app sub-module (router)
// const authRoutes = require("/auth-routes"); // import user logic module
const User = require("../models/user");

//To show the users data
adminRouter.get("/admin-panel/users", (req, res) => {
  // return res.send("here");
  User.find({})
    .then(users => {
      console.log("The received data from the DB: ", users);
      const data = {
        users
      };
      res.render("users.hbs", data);
    })
    .catch(err => {
      console.log("nay", err);
      console.log("The error while searching users occurred: ", err);
    });
});

//to delete users
adminRouter.get("/users/delete/:id", (req, res) => {
  console.log("blabla");
  User.findByIdAndDelete(req.params.id)
    .then(dbRes => {
      res.redirect("/admin-panel/users");
    })
    .catch(dbErr => {
      res.redirect("/users");
    });
});

module.exports = adminRouter;
