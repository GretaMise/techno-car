const express = require('express');

const carController = require('../controllers/carController');

// Using express router to direct API requests to the appropriate controller
const router = express.Router();

// Get all cars
router.get('/', carController.getCars);

// Get a car by ID
// const Car = require('../models/carModel');
router.get('/:id', carController.getCarById);

// module.exports = getCarById;

// Update a car by ID
router.put('/:id', carController.updateCar);

// Create a new car
router.post('/', carController.addNewCar);

// Delete a car by ID
router.delete('/:id', carController.deleteCar);

// Exporting this file for use in other modules
module.exports = router;
