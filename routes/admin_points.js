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

module.exports = adminRouter;
