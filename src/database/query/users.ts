import { Student } from './../models/users'

export const listStudents = async () => {
  try {
    const students = await Student.findAll({
      raw: true
    })

    // console.log(students)
    // console.log(students.map(el => el.get({ plain: true})))

    // console.log("All users:", JSON.stringify(students));
    return students
  } catch (e) {
    throw e
  }
}

export const searchStudent = async (email: string, password: string) => {
  try {
    const student = await Student.findAll({
      // attributes: ['first_name', 'last_name', 'email'],
      raw: true,
      where: {
        email: email,
        password: password
      }
    })
    if (student.length < 1) {
      return 'Account does not exist'
    } else {
      //   return JSON.stringify(student)
      return student
    }
  } catch (e) {
    // throw new Error("MY ERROR")
    throw e
  }
}
