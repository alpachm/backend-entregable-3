const express = require('express');
const userControllers = require('../controllers/users.controllers');
const validation = require('../middlewares/validation.middleware');
const usersMiddleware = require('../middlewares/users.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/signup', validation.signupValidaton, userControllers.signup);

router.post('/login', validation.loginValidation, userControllers.login);

router.use(authMiddleware.protect);

router.get('/orders', userControllers.findAllOrders);

router.get('/orders/:id', userControllers.findOneOrder);

router
  .route('/:id')
  .patch(
    usersMiddleware.validIfUserExist,
    validation.updateUserValidation,
    authMiddleware.protectAccountOwner,
    userControllers.updateUser
  )
  .delete(
    usersMiddleware.validIfUserExist,
    authMiddleware.protectAccountOwner,
    userControllers.deleteUser
  );

module.exports = router;
