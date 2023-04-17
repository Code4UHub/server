import { Student } from '../models/student'
import { StudentType } from '../../types/student.type'

export const selectStudents = async () => {
  try {
    const students = await Student.findAll({
      raw: true
    })

    // console.log(students)
    // console.log(students.map(el => el.get({ plain: true})))

    // console.log("All students:", JSON.stringify(students));
    return students
  } catch (e) {
    throw e
  }
}

export const selectStudent = async (email: string, password?: string) => {
  try {
    if (password) {
      const student = await Student.findAll({
        attributes: ['student_id', 'first_name', 'last_name', 'email'],
        raw: true,
        where: {
          email: email,
          password: password
        }
      })
      return student
    } else {
      const student = await Student.findAll({ raw: true, attributes: ['email'], where: { email: email } })
      return student
    }
  } catch (e) {
    // throw new Error("MY ERROR")
    throw e
  }
}

export const createStudent = async (student: StudentType) => {
  try {
    const res = await selectStudent(student.email)
    const studentExists = res.length > 0 ? true : false
    console.log(studentExists)
    if (!studentExists) {
      const res = await Student.create(student)
      console.log('Student succcesfully created')
      return res
    } else {
      return 'Student already exists'
    }
  } catch (e) {
    // throw e
    return 'Couldnt create Student'
  }
}
