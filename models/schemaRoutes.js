// models/user.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const routeSchema = new Schema(
  {
    name: { type: String },
    price: { type: String },
    time: { type: String },
    distance: { type: String },
    points: { type: Array },
    pointsids: { type: Array },
    pointsIdsInMongo: [
      {
        type: Schema.Types.ObjectId,
        ref: "Point"
      }
    ],
    info: { type: String }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const Route = mongoose.model("Route", routeSchema);

module.exports = Route;
