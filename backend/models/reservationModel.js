const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      // reference i car. nurodo, kurioje kolekcijoje yra automobilis, kad galetume apjungti duomenis (naudojame sita butent del Your Reservation (o zinome, jog "Car" , nes carModel faile taip esame uzsirase))
      ref: 'Car',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      // ref to the User modl, to know who made the reservation
      ref: 'User',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'reservations',
  }
);

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
