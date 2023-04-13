import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { createDb } from './database/connection'

dotenv.config()

const app: Express = require('./app')
const port = process.env.PORT

// app.get("/", (req: Request, res: Response) => {
//   res.send("Express + TypeScript Server 😀");
// });

app.listen(port, () => {
  const sequelize = createDb()
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
