// models/Product.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  used_by: { type: String, required: true },
  category: { type: String, enum: ["food", "wearable", "toy"], required: true },
  amount: { type: Number, required: true }
});

module.exports = mongoose.model("Product", ProductSchema);