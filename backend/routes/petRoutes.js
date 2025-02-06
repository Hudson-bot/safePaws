// routes/petRoutes.js
const express = require('express');
const router = express.Router();
const {
  createPet,
  getPets,
  getPetById,
  updatePet,
  deletePet,
} = require('../controllers/petController');

// Routes for handling pet data
router.post('/pets', createPet);
router.get('/pets', getPets);
router.get('/pets/:id', getPetById);
router.put('/pets/:id', updatePet);
router.delete('/pets/:id', deletePet);

module.exports = router;
