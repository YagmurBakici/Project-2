// models/points.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pointSchema = new Schema(
  {
    placeId: { type: String },
    name: { type: String },
    streetNumber: { type: String },
    route: { type: String },
    city: { type: String },
    country: { type: String },
    posteCode: { type: String },
    rating: { type: Number },
    category: { type: Array },
    website: { type: String }
  }
  //{
  // timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  //}
);

const Point = mongoose.model("Point", pointSchema);

module.exports = Point;
