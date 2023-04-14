// const pg = require('./connection')

import { createDb, authenticateDb } from './connection'
import { selectStudents, selectStudent } from './query/users'
import { StudentType } from './../types/user.type'

const test = async () => {
  const sequelize = await createDb()
  const validConnection = await authenticateDb(sequelize)
  if (validConnection) {
    // console.log("Connected");
    // const res = await searchStudent('a00000001@tec.com', 'Abc123456')
    // const newStudent: StudentType = {
    //   student_id: 'A01552274',
    //   first_name: 'Juan',
    //   last_name: 'Rulfo',
    //   email: 'a01552274@tec.com',
    //   password: '12345'
    // }

    // const createRes = await postUser(newStudent)

    // const res = await listStudents()
    // console.log(res)
    const res = await selectStudent('a00000001@tec.com', 'Abc123456')
    console.log(res)
    sequelize.close()
  }
}

test()
