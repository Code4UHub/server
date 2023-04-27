import express, { Express } from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { createDb } from './database/connection'
import { router as studentRouter } from './routes/student.route'
import { router as teacherRouter } from './routes/teacher.route'
import { router as subjectRouter } from './routes/subject.route'
import { router as questionRouter } from './routes/question.route'
import { router as assignmentRouter } from './routes/assignment.route'
import { router as moduleRouter } from './routes/module.route'
import { router as classRouter } from './routes/class.route'
import authMiddleware from './middleware/auth.middleware'

export const db = createDb()
const app: Express = express()

export const db = createDb()
const app: Express = express()

// 1) MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const allowedOrigins = ['*']
const options: cors.CorsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200
}

app.options('*', cors())
app.use(cors(options))
app.use(express.json())

app.use((req, res, next) => {
  authMiddleware(req, res, next)
})

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

// 2) ROUTE HANDLERS

// 3) ROUTES
// app.use('/api/v1/tours', tourRouter);
// const url: string = '/api/v1'

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
app.use(`${url}`, assignmentRouter)
app.use(`${url}`, moduleRouter)
app.use(`${url}`, classRouter)
app.use(`${url}`, questionRouter)

export default app
