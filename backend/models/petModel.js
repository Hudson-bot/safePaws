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

// Prevent overwriting of the Pet model if it is already defined
const Pet = mongoose.models.Pet || mongoose.model("Pet", petSchema);

module.exports = Pet;
