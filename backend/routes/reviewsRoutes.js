// viskas tik su GET. jokiu create, update.. chill

const express = require('express');

const reviewsController = require('../controllers/reviewsController');

// express router to direct API requests to the appropriate controller functions

const router = express.Router();

// get all reviews

router.get('/', reviewsController.getReviews);

router.post('/', reviewsController.createReview);

// export this file for use in other modules
module.exports = router;
