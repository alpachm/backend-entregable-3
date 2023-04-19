const express = require('express');
const usersRouter = require('./routes/users.routes');
const restaurantsRouter = require('./routes/restaurants.routes');
const mealsRouter = require('./routes/meals.routes');
const ordersRouter = require('./routes/orders.routes');
const AppError = require('./utils/appError');
const { globalErrorHandler } = require('./controllers/error.controllers');
const morgan = require('morgan');
const cors = require('cors');
const hpp = require('hpp');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const app = express();

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in one hour',
});

app.use(helmet());
app.use(express.json());
app.use(xss());
app.use(hpp());
app.use(cors());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use('api/v1', limiter);

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/restaurants', restaurantsRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/orders', ordersRouter);

app.all('*', (req, res, next) =>
  next(
    new AppError(`The route ${req.originalUrl} was not found in this site`, 404)
  )
);

app.use(globalErrorHandler);

module.exports = app;
