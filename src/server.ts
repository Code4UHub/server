import dotenv from 'dotenv'
// import { createDb } from './database/connection'
import getApp from './app'

dotenv.config()

const app = getApp()

// const sequelize = createDb()
const port = process.env.PORT

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

export default app
