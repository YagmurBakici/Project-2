<div id="container">
  <h2>You are in a session!</h2>
</div>;
const express = require("express");
const router = express.Router();
// to protect the path of  the home page so people need to login and access to home page
router.use((req, res, next) => {
  if (req.session.currentUser) {
    // <== if there's user in the session (user is logged in)
    next(); // ==> go to the next route ---
  } else {
    //    |
    res.redirect("/login"); //    |
  } //    |
}); // ------------------------------------
//     |
//     V
router.get("/home", (req, res, next) => {
  res.render("home.hbs");
});
router.get("/", (req, res, next) => {
  res.render("home.hbs");
});

module.exports = router;
