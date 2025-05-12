const Car = require('../models/carModel');
// Controller valdo logika, kaip reaguoti i API uzklausas/requestus ir kreipiasi i Model, jeigu atitinka business logika (business logika - kad grazins visada)
const Reservation = require('../models/reservationModel');

exports.getCars = async (req, res) => {
  try {
    const allCars = await Car.find();
    res.status(200).json(allCars);
  } catch (error) {
    res.status(500).json({ error: 'Server (controller getCars) error' });
  }
};

exports.getCarById = async (req, res) => {
  const carId = req.params.id;
  try {
    const carById = await Car.findById(carId);

    if (!carById) {
      res.status(404).json({ error: 'Car not found' });
      return;
    }

    res.status(200).json(carById);
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
    if (req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ error: 'Not authorized. Admin access required' });
    }
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
};

// create new
// ADMIN ONLY
exports.addNewCar = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ error: 'Not authorized. Admin access required' });
    }

    const newCar = new Car(req.body);
    await newCar.save();

    res.status(201).json({ message: 'Car created successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create car',
    });
  }
};

//delete

exports.deleteCar = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ error: 'Not authorized. Admin access required' });
    }
    const carId = req.params.id;

    // rezervaciju lenteleje suras su carId visas rezervacijas. Istrins visas kolekcijas su siuo id
    await Reservation.deleteMany({ carId });

    const deletedCar = await Car.findByIdAndDelete(carId);

    if (!deletedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.status(201).json({ message: 'Car deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
