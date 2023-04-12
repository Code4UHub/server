import express, { Express, Request, Response } from "express";
import morgan from 'morgan'

const app: Express = express();

// const tourRouter = require('./routes/tourRoutes');
import  { router as userRouter }    from './routes/userRoutes';

// 1) MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// app.use((req, res, next) => {
//   console.log('Hello from the midleware 👋');
//   next();
// });

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

// 2) ROUTE HANDLERS

// 3) ROUTES
// app.use('/api/v1/tours', tourRouter);
// const url: string = '/api/v1'
const url: string = ''

app.use(`${url}/user`, userRouter);



module.exports = app;