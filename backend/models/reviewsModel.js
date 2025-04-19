// model atsakingas uz duomenu bazes operacijas

// sena struktura ::::
// const fs = require('fs');
// const filePath = './database/reviews.json';
// const { v4: uuidv4 } = require('uuid');

// const getAllReviews = () => {
//   const data = fs.readFileSync(filePath);
//   return JSON.parse(data);
// };

// const createReview = (reviewData) => {
//   const reviews = getAllReviews();

//   const newReview = {
//     id: uuidv4(),
//     ...reviewData,
//     date: new Date().toISOString(),
//   };

//   reviews.push(newReview);
//   fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2));

//   return newReview;
// };

// module.exports = {
//   getAllReviews,
//   createReview,
// };

// NAUJA STRUKTURA ::::
// nauja schema
// sukuriame MongoDB paasikinima, kaip turi buti atvaizduojamas atsilipimo failas
const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    // jei norime, kad sukurtu automatiskai laika
    timestamps: true,
    collection: 'reviews',
  }
);

module.exports = mongoose.model('Review', reviewsSchema);
