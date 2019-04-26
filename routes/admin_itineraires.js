const express = require("express"); // import express in this module
const adminRouter = new express.Router(); // create an app sub-module (router)
// const authRoutes = require("/auth-routes"); // import user logic module
const Route = require("../models/schemaRoutes");

adminRouter.post("/create-route", (req, res) => {
  console.log(req.body);
  const { name, price, time, distance, points, pointsids, info } = req.body;

  var pointsArr = pointsids.split(",");
  console.log(pointsArr);

  Route.create({
    name,
    price,
    time,
    distance,
    points,
    pointsids: pointsArr,
    info
  })
    .then(ok => {
      console.log("db oki");
      res.redirect("/admin-panel");
    })
    .catch(notok => {
      console.log("db not oki");
      res.send("no good");
    });
});

//To show the routes
adminRouter.get("/admin-panel/routes_manage", (req, res) => {
  // return res.send("here");

  Route.find({})
    .then(routes => {
      // console.log(points, "gogogogogogo");

      // console.log("The received data from the DB: ", points);
      const data = {
        routes
      };
      console.log(data.routes, "data");

      res.render("routes_manage.hbs", { data: data.routes });
    })
    .catch(err => {
      console.log("nay", err);
      console.log("The error while searching routes occurred: ", err);
    });
});

//To send the routes to the display routes page
adminRouter.get("/users_routes", (req, res) => {
  // return res.send("here");
  Route.find({})
    .then(routes => {
      console.log(routes, "gogogogogogo");

      // console.log("The received data from the DB: ", points);

      // console.log(data.points, "data");
      const data = {
        routes
      };

      res.render("users_routes.hbs", { data: data.routes });
    })
    .catch(err => {
      console.log("nay", err);
      console.log("The error while searching points occurred: ", err);
    });
});

//To send the routes to the display in User page
adminRouter.get("/users_choice/:id", (req, res) => {
  // return res.send("here");
  // console.log(req.params.id);

  Route.find({ _id: req.params.id })
    .then(routes => {
      console.log(routes, "choosen");

      const data = {
        routes
      };

      res.render("users_choice.hbs", { data: data.routes });
    })
    .catch(err => {
      console.log("Error", err);
      console.log("The error while searching points occurred: ", err);
    });
});

//to delete routes
adminRouter.get("/routes/delete/:id", (req, res) => {
  console.log("blabla");
  Route.findByIdAndDelete(req.params.id)
    .then(dbRes => {
      res.redirect("/admin-panel/routes_manage");
    })
    .catch(dbErr => {
      res.redirect("/route_manage");
    });
});

module.exports = adminRouter;
