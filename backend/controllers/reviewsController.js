const Review = require('../models/reviewsModel');

// all
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// create
exports.createReview = async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    // validacija 1
    if (!name || !rating || !comment) {
      return res.status(400).json({ error: 'Please fill in all fields' });
    }
    // validacija 2
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // const newReview = new Review({ name, rating, comment });
    // await newReview.save();

    const newReview = new Review({ name, rating, comment });
    await newReview.save();
    res.status(201).json({ message: 'Review created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating review' });
  }
};

// update

// delete
