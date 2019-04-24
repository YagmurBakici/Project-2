const express = require("express"); // import express in this module
const adminRouter = new express.Router(); // create an app sub-module (router)
// const authRoutes = require("/auth-routes"); // import user logic module
const Point = require("../models/points");

adminRouter.post("/create-point", (req, res) => {
  console.log(req.body);
  const { placeData } = req.body;

  Point.create({ ...placeData }) // es6 spread operator => make key value paırs out of placeData object
    .then(ok => {
      console.log("db oki");
      res.send("good");
    })
    .catch(notok => {
      console.log("db not oki");
      res.send("no good");
    });
});

//To show the points
adminRouter.get("/admin-panel/points_manage", (req, res) => {
  // return res.send("here");

  Point.find({})
    .then(points => {
      // console.log(points, "gogogogogogo");

      // console.log("The received data from the DB: ", points);
      const data = {
        points
      };
      console.log(data.points, "data");

      res.render("points_manage.hbs", { data: data.points });
    })
    .catch(err => {
      console.log("nay", err);
      console.log("The error while searching points occurred: ", err);
    });
});

//to delete points
adminRouter.get("/points/delete/:id", (req, res) => {
  console.log("blabla");
  Point.findByIdAndDelete(req.params.id)
    .then(dbRes => {
      res.redirect("/admin-panel/points_manage");
    })
    .catch(dbErr => {
      res.redirect("/points_manage");
    });
});

module.exports = adminRouter;
