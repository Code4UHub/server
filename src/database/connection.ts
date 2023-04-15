import { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

import { Student } from './models/student'
import { Teacher } from './models/teacher'
import dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../../.env` })

export const createDb = async () => {
  try {
    const database: string = process.env.DB_NAME!
    const userName: string = process.env.DB_USER!
    const hostName: string = process.env.DB_HOST!
    const password: string = process.env.DB_PASS!
    const dialect: string = process.env.DB_LANG!

    const sequelize = new Sequelize(database, userName, password, {
      host: hostName,
      dialect: dialect as Dialect,
      // repositoryMode: true,
      pool: {
        max: 10,
        min: 0,
        acquire: 20000,
        idle: 5000
      },
      define: {
        defaultScope: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        timestamps: false,
        freezeTableName: true
      },
      logging: false
    })

    sequelize.addModels([Student, Teacher])

    return sequelize
  } catch (e) {
    throw e
  }
}

export const authenticateDb = async (client: Sequelize) => {
  try {
    await client.authenticate()
    console.log('***Connection has been established successfully***')
    return true
  } catch (error) {
    console.error('***Unable to connect to the database:', error)
  }
}
