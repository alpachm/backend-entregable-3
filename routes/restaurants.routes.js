const express = require('express');
const restaurantController = require('../controllers/restaurants.controllers');
const restaurantMiddleware = require('../middlewares/restaurants.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const validation = require('../middlewares/validation.middleware');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', restaurantController.findAllRestaurants);

router.get(
  '/:id',
  restaurantMiddleware.validIfRestaurantExist,
  restaurantController.findOneRestaurant
);

router.use(protect);

router.post(
  '/',
  validation.createRestaurantValidation,
  restaurantController.createRestaurant
);

router
  .route('/:id')
  .patch(
    restaurantMiddleware.validIfRestaurantExist,
    validation.updaterestaurantValidation,
    restaurantController.updateRestaurant
  )
  .delete(
    restaurantMiddleware.validIfRestaurantExist,
    restaurantController.deleteRestaurant
  );

router.post(
  '/reviews/:id',
  restaurantMiddleware.validIfRestaurantExist,
  restaurantController.createReview
);

router
  .route('/reviews/:restaurantId/:id')
  .patch(
    validation.updateReviewValidation,
    restaurantMiddleware.validReviewOfRestuarant,
    authMiddleware.protectReviewOwner,
    restaurantController.updateReviewRestaurant
  )
  .delete(
    restaurantMiddleware.validReviewOfRestuarant,
    authMiddleware.protectReviewOwner,
    restaurantController.deleteReview
  );

module.exports = router;
