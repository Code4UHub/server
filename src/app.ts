import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { router as studentRouter } from './routes/studentRoute'
import { router as teacherRouter } from './routes/teacherRoute'
import { router as subjectRouter } from './routes/subjectRoute'
import { createDb } from './database/connection'

const getApp = () => {
  createDb()
  const app: Application = express()

  // 1) MIDDLEWARE
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }

  const allowedOrigins = ['*']
  const options: cors.CorsOptions = {
    origin: allowedOrigins
  }

  app.use(cors(options))
  app.use(express.json())

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
  const url = '/v1'

  app.use(`${url}`, studentRouter)
  app.use(`${url}`, teacherRouter)
  app.use(`${url}`, subjectRouter)

  return app
}

export default getApp
