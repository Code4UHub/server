import dotenv from 'dotenv'
import { createDb } from './database/connection'
import app from './app'

dotenv.config()

// const app = TemplateApp

// const sequelize = createDb()
createDb()
const port = process.env.PORT

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
