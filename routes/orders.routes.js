const express = require('express');
const { protect } = require('../middlewares/auth.middleware');
const validation = require('../middlewares/validation.middleware');
const ordersControllers = require('../controllers/orders.controllers');
const ordersMiddlewares = require('../middlewares/orders.mmiddleware');

const router = express.Router();

router.use(protect);

router.post(
  '/',
  validation.createOrderValidation,
  ordersControllers.createOrder
);

router.get('/me', ordersControllers.findUserOrder);

router
  .route('/:id')
  .patch(ordersMiddlewares.validIfExistOrder, ordersControllers.updateOrder)
  .delete(ordersMiddlewares.validIfExistOrder, ordersControllers.deleteOrder);

module.exports = router;
