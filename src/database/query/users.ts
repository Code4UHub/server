import { Student } from './../models/users'

export const selectStudents = async () => {
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

export const selectStudent = async (email: string, password?: string) => {
  try {
    if (password) {
      const student = await Student.findAll({
        // attributes: ['first_name', 'last_name', 'email'],
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

export const createUser = async (student: StudentType) => {
  try {
    const user = await selectStudent(student.email)
    const userExists = user.length > 0 ? true : false
    console.log(userExists)
    if (!userExists) {
      const res = await Student.create(student)
      console.log('User succcesfully created')
      return res
    } else {
      return 'User already exists'
    }
  } catch (e) {
    // throw e
    return 'Couldnt create user'
  }
}
