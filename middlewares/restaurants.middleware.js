const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Restaurant = require('../models/restaurants.model');
const Review = require('../models/reviews.model');

exports.validIfRestaurantExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      id,
      status: 'active',
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  });

  if (!restaurant) next(new AppError('Restaurant was not found', 404));

  req.restaurant = restaurant;

  next();
});

exports.validReviewOfRestuarant = catchAsync(async (req, res, next) => {
  const { restaurantId, id } = req.params;
  const { sessionUser } = req;

  const restaurant = await Restaurant.findOne({
    where: {
      id: restaurantId,
      status: 'active',
    },
  });

  if (!restaurant) next(new AppError('Restaurant was not found', 404));

  const review = await Review.findOne({
    where: {
      id,
      restaurantId: restaurant.id,
    },
  });

  if (!review) next(new AppError('Review was not found', 404));

  req.review = review;

  next();
});
