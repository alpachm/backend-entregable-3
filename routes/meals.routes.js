const express = require('express');
const mealsControllers = require('../controllers/meals.controllers');
const mealsMiddleware = require('../middlewares/meals.middleware');
const restaurantMiddleware = require('../middlewares/restaurants.middleware');
const validation = require('../middlewares/validation.middleware');
const { protect } = require('../middlewares/auth.middleware');
const restrictTo = require('../middlewares/restrictTo');

const router = express.Router();

router.get('/', mealsControllers.findAllMeals);

router.get(
  '/:id',
  mealsMiddleware.validIfMealExist,
  mealsControllers.findOneMeal
);

router.use(protect, restrictTo('admin'));

router
  .route('/:id')
  .post(
    validation.createMealValidation,
    restaurantMiddleware.validIfRestaurantExist,
    mealsControllers.createMeal
  )
  .patch(
    validation.createMealValidation,
    mealsMiddleware.validIfMealExist,
    mealsControllers.updateMeal
  )
  .delete(mealsMiddleware.validIfMealExist, mealsControllers.deleteMeal);

module.exports = router;
