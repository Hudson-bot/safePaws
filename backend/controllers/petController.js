// controllers/petController.js
const Pet = require('../models/petModel');

// Create a new pet
const createPet = async (req, res) => {
  try {
    const { name, age, gender, breed, type, photo } = req.body;
    const newPet = new Pet({ name, age, gender, breed, type, photo });

    await newPet.save();
    res.status(201).json(newPet);
  } catch (error) {
    res.status(400).json({ message: 'Error creating pet', error });
  }
};

// Get all pets
const getPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching pets', error });
  }
};

// Get pet by ID
const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json(pet);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching pet', error });
  }
};

// Update pet by ID
const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json(pet);
  } catch (error) {
    res.status(400).json({ message: 'Error updating pet', error });
  }
};

// Delete pet by ID
const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting pet', error });
  }
};

module.exports = { createPet, getPets, getPetById, updatePet, deletePet };
