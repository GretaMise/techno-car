const Car = require('../models/carModel');
// Controller valdo logika, kaip reaguoti i API uzklausas/requestus ir kreipiasi i Model, jeigu atitinka business logika (business logika - kad grazins visada)

exports.getCars = async (req, res) => {
  try {
    const allCars = await Car.find();
    res.status(200).json(allCars);
  } catch (error) {
    res.status(500).json({ error: 'Server (controller getCars) error' });
  }
};

exports.getCarById = async (req, res) => {
  try {
    const carId = req.params.id;
    const carById = await Car.findById(carId);

    if (!carById) {
      res.status(404).json({ error: 'Car not found' });
    }

    res.status(201).json({ message: 'Car found by id', carById });
  } catch (error) {
    res.status(500).json({ error: 'Server (controller getCarById) error' });
  }

  // SITO NEREIKIA
  // const carId = req.params.id;
  // const car = Car.getCarById(carId);

  // //   const response = await fetch(`${port}/${carId}`);
  // // const data = await response.json();

  // if (!car) {
  //   return res.status(404).json({ message: 'Car not found' });
  // }

  // res.json(car);
};

// Update
exports.updateCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const updatedCar = await Car.findByIdAndUpdate(carId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json({ message: 'Car updated' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }

  // const carId = req.params.id;
  // const car = Car.getCarById(carId);

  // if (!car) {
  //   return res.status(404).json({ message: 'Car not found' });
  // }

  // const updatedCar = Car.updateCar(carId, req.body);
  // res.json(updatedCar);
};

// create new

exports.addNewCar = async (req, res) => {
  try {
    const newCar = await Car.create(req.body);
    await newCar.save();
    res.status(201).json({ message: 'Car created' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }

  // const { make, model } = req.body;
  // const cars = Car.getAllCars();
  // const newCar = {
  //   id: cars.length + 1,
  //   make: make,
  //   model: model,
  // };
  // cars.push(newCar);

  // // fs.writeFileSync(filePath, JSON.stringify(cars, null, 2));

  // res.status(201).json(newCar);
};

//delete

exports.deleteCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const deletedCar = await Car.findByIdAndDelete(carId);

    if (!deletedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.status(201).json({ message: 'Car deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
  // const carId = req.params.id;
  // const car = Car.getCarById(carId);

  // if (!car) {
  //   return res.status(404).json({ message: 'Car not found' });
  // }

  // Car.deleteCar(carId);
  // res.status(204).send();
};

// module.exports = {
//   getCars,
//   getCarById,
//   updateCar,
//   addNewCar,
//   deleteCar,
// };
