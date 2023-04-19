import { Dialect } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

import { Student } from './models/student.model'
import { Teacher } from './models/teacher.model'
import { Subject } from './models/subject.model'
import { Assignment } from './models/assignment.model'
import { Module } from './models/module.model'
import { OpenQuestion } from './models/openQuestion.model'
import { CloseQuestion } from './models/closeQuestion.model'

import dotenv from 'dotenv'

dotenv.config({ path: `${__dirname}/../../.env` })

export const createDb = async () => {
  try {
    const database = process.env.DB_NAME as string
    const userName = process.env.DB_USER as string
    const hostName = process.env.DB_HOST as string
    const password = process.env.DB_PASS as string
    const dialect = process.env.DB_LANG as string

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
      logging: false,
      query: {
        raw: true
      }
    })

    sequelize.addModels([Student, Teacher, Subject, Module, Assignment, OpenQuestion, CloseQuestion])

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
