const Car = require('../models/carModel');
const Reservation = require('../models/reservationModel');

// sukuriame rezervacija

exports.createReservation = async (req, res) => {
  try {
    const { carId, totalDays, startDate, endDate } = req.body;

    // 1. Patikriname ar zmogus yra autentifikuotas
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorised' });
    }
    // 2. patikriname ar automobilis egzistuoja
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    // 3. Ar pasirinktomis datomis automobilis yra laisvas
    const isCarAvailable = await Reservation.findOne({
      carId,
      // $expr - leidzia duoti salygas, kurios yra sudetingesnes nei paprastos (expression)
      $expr: {
        // $or - leidzia patikrinti ar tarp startDate ir endDate diena yra laisva
        $or: [
          { $gte: ['$startDate', startDate] },
          { $gte: ['$endDate', endDate] },
        ],
      },
    });

    if (isCarAvailable) {
      return res
        .status(400)
        .json({ error: 'Car is not available for the selected dates' });
    }

    // 4. paskaiciuojam kiek kainuos rezervacija

    const totalPrice = car.price * totalDays;

    // 5. sukuriam rezervacija
    const reservation = new Reservation({
      carId,
      userId,
      startDate,
      endDate,
      totalPrice,
    });
    await reservation.save();

    res.status(201).json({ message: 'Reservation created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create the reservation' });
  }
};

// gaunam vartotojo (butent to user'io) rezervacija

exports.getUserReservations = async (req, res) => {
  try {
    const userId = req.user._id;
    const reservations = await Reservation.find({ userId })
      .populate('carId', 'make model image')
      .lean();
    // lean - grazina paprastus JS objektus, o ne Mongoose dokumentus

    const formattedReservations = reservations.map((reservation) => ({
      ...reservation,
      car: reservation.carId,
      carId: reservation.carId._id,
    }));

    res.status(200).json(formattedReservations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get reservation' });
  }
  // apjungsime rezervacijas, kad gautume su duomenimis user ir car
};

// delete reservation

exports.deleteReservation = async (req, res) => {
  try {
    // prie id  nereikia _id, nes nurodome, kaip tiesiogiai turetu eiti nuoroda: kazkas/api/reservation/id, o ne kazkas/api/reservation/_id
    const reservationId = req.params.id;
    const deletedReservation = await Reservation.findByIdAndDelete(
      reservationId
    );

    if (!deletedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(201).json({ message: 'Reservation deleted' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Server error or failed to get the reservation' });
  }
};

// admin only?
exports.getAllReservations = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ error: 'Not authorized. Admin access required' });
    }
    const allReservations = await Reservation.find()
      .populate('carId', 'make model image price')
      .populate('userId', 'name email')
      .lean();

    const formattedReservations = allReservations.map((reservation) => ({
      ...reservation,
      car: reservation.carId,
      carId: reservation.carId._id,
      user: reservation.userId,
      userId: reservation.userId._id,
    }));

    res.status(200).json(formattedReservations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get all reservations' });
  }
};

// grazinti visas rezervacijas (admin)

// exports.getAllReservations = async (req, res) => {
//   try {
//     if (req.user.role !== 'admin') {

//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Failed to get all reservations' });
//   }
// };
