import { Teacher } from '../models/teacher'

export const selectTeacher = async (email: string, password?: string) => {
  try {
    if (password) {
      const teacher = await Teacher.findAll({
        attributes: ['teacher_id', 'first_name', 'last_name', 'email'],
        raw: true,
        where: {
          email: email,
          password: password
        }
      })
      return teacher
    } else {
      const teacher = await Teacher.findAll({ raw: true, attributes: ['email'], where: { email: email } })
      return teacher
    }
  } catch (e) {
    // throw new Error("MY ERROR")
    throw e
  }
}

export const selectTeachers = async () => {
  try {
    const teachers = await Teacher.findAll({
      raw: true
    })

    // console.log(teachers)
    // console.log(teachers.map(el => el.get({ plain: true})))

    // console.log("All teachers:", JSON.stringify(teachers));
    return teachers
  } catch (e) {
    throw e
  }
}
