import { SelectedTeacherType, TeacherType } from '../../types/teacher.type'
import { Teacher } from '../models/teacher.model'
import { Class } from '../models/class.model'
import { Subject } from '../models/subject.model'

export const selectTeachers = async () => {
  try {
    const teachers = await Teacher.findAll({})
    return teachers
  } catch (e) {
    throw e
  }
}

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

export const createTeacher = async (teacher: TeacherType): Promise<SelectedTeacherType | string> => {
  try {
    const res = await selectTeacher(teacher.email)
    const teacherExists = res.length > 0 ? true : false
    if (!teacherExists) {
      const res = await Teacher.create(teacher)
      const user = res.get({ plain: true })
      console.log('Teacher succcesfully created')
      return user
    } else {
      return 'Teacher already exists'
    }
  } catch (e) {
    // throw e
    console.log(e)
    return 'Couldnt create teacher'
  }
}

export const selectClassesByTeacher = async (teacher_id: string) => {
  try {
    const classesByTeacher = await Class.findAll({
      raw: true,
      attributes: ['class_id', 'subject_id', 'subject.subject_name', 'days', 'start_time', 'end_time'],
      where: {
        teacher_id: teacher_id
      },
      include: [
        {
          model: Subject,
          attributes: [],
          required: true
        }
      ]
    })
    return classesByTeacher
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}
