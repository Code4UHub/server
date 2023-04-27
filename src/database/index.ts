<<<<<<< HEAD
=======
// const pg = require('./connection')

import { getTeachers } from '../controllers/teacher.controller'
import { StudentType } from '../types/student.type'
import { createDb, authenticateDb } from './connection'
import { createStudent, selectStudent, selectStudents } from './query/student.query'
import { selectSubjects } from './query/subject.query'
import { selectTeacher, selectTeachers } from './query/teacher.query'

const test = async () => {
  const sequelize = await createDb()
  const validConnection = await authenticateDb(sequelize)
  if (validConnection) {
    // console.log("Connected");
    const res = await selectSubjects()
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
>>>>>>> dev
