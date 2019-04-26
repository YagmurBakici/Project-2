require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const router = require("./routes/admin_routes");

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use((req, res, next) => {
  if (req.path === "/favicon.ico") {
    console.log("Favicon blocked...");
    return res.send(
      "Blocking favicon to not create more sessions... Implement code for handling favicons."
    );
  }
  next();
});
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup- and relate scss and css

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

//app.use("/home.hbs", require("./routes/site-routes.js"));

app.use(
  session({
    secret: "basic-auth-secret",
    cookie: { maxAge: 1800000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    })
  })
);

// Function to know who is connected and pass {{isLoggedIn}} as object with all data of the conected user wherever you want
// {{isLoggedIn}} ıs the sesion
// {{user}} are the data
function checkloginStatus(req, res, next) {
  res.locals.isLoggedIn = Boolean(req.session.currentUser); // {{isLoggedIn}} in .hbs
  res.locals.user = req.session.currentUser; // {{user}} in .hbs
  // console.log(req);
  next();
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));
app.use(checkloginStatus); // check user connection at each server request

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

const index = require("./routes/index");
app.use("/", index);

const authroutes = require("./routes/auth-routes");
app.use(authroutes);

const adminRouter = require("./routes/admin_routes");
app.use(adminRouter);

const adminPoints = require("./routes/admin_points");
app.use(adminPoints);

const adminitineraires = require("./routes/admin_itineraires");
app.use(adminitineraires);

module.exports = app;
