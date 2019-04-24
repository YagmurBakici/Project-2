// models/points.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pointSchema = new Schema(
  {
    place_id: { type: String },
    name: { type: String },
    rating: { type: Number },
    types: { type: Array },
    website: { type: String },
    address_components: { type: Object }
  }
  //{
  // timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  //}
);

const Point = mongoose.model("Point", pointSchema);

module.exports = Point;
