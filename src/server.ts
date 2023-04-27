import dotenv from 'dotenv'
import app from './app'

dotenv.config()

// const sequelize = createDb()
const port = process.env.PORT

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

export default app
