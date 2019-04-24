const express = require("express"); // import express in this module
const adminRouter = new express.Router(); // create an app sub-module (router)
// const authRoutes = require("/auth-routes"); // import user logic module
const Route = require("../models/schemaRoutes");

adminRouter.post("/create-route", (req, res) => {
  console.log(req.body);
  const { name, price, time, distance, points, info } = req.body;

  Route.create({ name, price, time, distance, points, info })
    .then(ok => {
      console.log("db oki");
      res.redirect("/admin-panel");
    })
    .catch(notok => {
      console.log("db not oki");
      res.send("no good");
    });
});

// //To show the routes
// adminRouter.get("/admin-panel/points_manage", (req, res) => {
//   // return res.send("here");

//   Point.find({})
//     .then(points => {
//       // console.log(points, "gogogogogogo");

//       // console.log("The received data from the DB: ", points);
//       const data = {
//         points
//       };
//       console.log(data.points, "data");

//       res.render("points_manage.hbs", { data: data.points });
//     })
//     .catch(err => {
//       console.log("nay", err);
//       console.log("The error while searching points occurred: ", err);
//     });
// });

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

// //to delete points
// adminRouter.get("/points/delete/:id", (req, res) => {
//   console.log("blabla");
//   Point.findByIdAndDelete(req.params.id)
//     .then(dbRes => {
//       res.redirect("/admin-panel/points_manage");
//     })
//     .catch(dbErr => {
//       res.redirect("/points_manage");
//     });
// });

module.exports = adminRouter;
