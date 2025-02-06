// models/petModel.js
const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    breed: { type: String, required: true },
    type: { type: String, required: true },
    photo: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
