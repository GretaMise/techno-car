const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// susiimportuojame route is carRoutes failo
const carRoutes = require('./routes/carRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const authRoutes = require('./routes/authRoutes')


dotenv.config();

const app = express();

//Cors - leidzia siusti API uzklausas is kito domeno pvz localhost:3000 --> localhost:5173
app.use(cors());
// visa info ateis json formatu, todel pasakom, jog musu express naudos json formata
app.use(express.json());
// nukreipiame visa API uzklausas, kurios prasideda /api/cars i carRoutes faila, kuris toliau tvarkys uzklausas, susijusias su automobiliais
app.use('/api/cars', carRoutes);

// reviews api
app.use('/api/reviews', reviewsRoutes);
// autorizacijos route
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 3003;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

// server.js yra atsakingas uz tai, kas vyks toliau. Tai yra pagrindinis failas, kuris paleidzia serveri ir nukreipia marsrutus i atitinkamus failus.

// api/books get, post, put, delete - visi marsrutai, kurie yra atsakingi už knygas
// api/user get, put, post, delete
// trumpiau tariant - naudojami skirtingi endpoint books ir user. viskas kas aprasyta yra routes, eina i books, user, gali i reviews eiti ir etc.
// tam, kad nereiktu visko viename faile naudot, galime naudoti express routeri
