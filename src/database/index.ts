// const pg = require('./connection')

import { getTeachers } from '../controllers/teacher.controller'
import { StudentType } from '../types/student.type'
import { createDb, authenticateDb } from './connection'
import { createStudent, selectStudent, selectStudents } from './query/student.query'
import { selectTeacher, selectTeachers } from './query/teacher.query'

const test = async () => {
  const sequelize = await createDb()
  const validConnection = await authenticateDb(sequelize)
  if (validConnection) {
    // console.log("Connected");

    // const res = await listStudents()
    // console.log(res)
    const email = 'a00000017@tec.mx'
    const pwd = 'Abc123456'
    // const email = 'l00000001@tec.com'
    // const pwd = 'Abc123456'
    const student: StudentType = {
      student_id: 'a00000017',
      first_name: 'My Name',
      last_name: 'My LastName',
      email: email,
      password: pwd
    }
    const res = await createStudent(student)
    // const res = await selectStudents()
    console.log(res)
    // console.log(res.length)

    // if (email[0] == 'a') {
    //   res = await selectStudent(email, pwd)
    //   if (res.length > 0) {
    //     console.log('Student:', res[0])
    //   } else {
    //     console.log('Luego lo arreglo')
    //   }
    // } else {
    //   res = await selectTeacher(email, pwd)
    //   if (res.length > 0) {
    //     console.log('Teacher:', res[0])
    //   } else {
    //     console.log('Luego lo arreglo')
    //   }
    // }

    sequelize.close()
  }
}

test()
