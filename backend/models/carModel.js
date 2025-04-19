// Model - atsakingas uz duomenu bazes operacijas
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    features: {
      type: Array,
      required: true,
      trim: true,
    },

    transmission: {
      type: String,
      required: true,
      trim: true,
    },
    fuel: {
      type: String,
      required: true,
      trim: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'cars',
    timestamps: true,
    visionKey: false,
  }
);

module.exports = mongoose.model('Car', carSchema);

// "id": "1",
// "make": "Toyota",
// "model": "Corolla",
// "description": "Patikimas ir ekonomiskas miesto automobilis",
// "price": 45,
// "features": ["air conditioning", "cruise control", "power steering"],
// "transmission": "mechanic",
// "fuel": "gasoline",
// "seats": 5,
// "year": 2015,
// "image":

// const fs = require('fs');
// const filePath = './database/cars.json';

// const getAllCars = () => {
//   const data = fs.readFileSync(filePath);
//   return JSON.parse(data);
// };

// const getCarById = (id) => {
//   const cars = getAllCars();
//   return cars.find((car) => car.id === id);
// };

// const updateCar = (id, updatedCar) => {
//   const cars = getAllCars();
//   const carIndex = cars.findIndex((car) => car.id === id);

//   if (carIndex === -1) {
//     return null;
//   }

//   cars[carIndex].make = updatedCar.make || cars[carIndex].make;
//   cars[carIndex].model = updatedCar.model || cars[carIndex].model;

//   return cars[carIndex];
// };

// const addNewCar = (car) => {
//   const cars = getAllCars();
//   cars.push(car);
// };

// module.exports = {
//   getAllCars,
//   getCarById,
//   updateCar,
//   addNewCar,
// };
