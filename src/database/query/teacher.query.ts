import { TeacherType } from '../../types/teacher.type'
import { Teacher } from '../models/teacher.model'
import { Class } from '../models/class.model'
import { Subject } from '../models/subject.model'

export const selectTeachers = async (): Promise<TeacherType[]> => {
  try {
    const teachers = await Teacher.findAll({
      attributes: ['teacher_id', 'first_name', 'last_name', 'email']
    })
    return teachers
  } catch (e: any) {
    throw e
  }
}

export const selectTeacher = async (email: string, password?: string): Promise<TeacherType | null> => {
  try {
    if (password) {
      const teacher = await Teacher.findOne({
        attributes: ['teacher_id', 'first_name', 'last_name', 'email'],
        where: {
          email: email,
          password: password
        }
      })
      return teacher
    } else {
      const teacher = await Teacher.findOne({ raw: true, attributes: ['email'], where: { email: email } })
      return teacher
    }
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}

export const createTeacher = async (teacher: TeacherType): Promise<TeacherType | null> => {
  try {
    const res: TeacherType | null = await selectTeacher(teacher.email)
    const exists: boolean = res !== null && typeof res === 'object' ? true : false
    if (!exists) {
      const res = await Teacher.create(teacher)
      // const user = res.get({ plain: true })
      // console.log('Teacher succcesfully created')
      return res
    } else {
      return null
    }
  } catch (e) {
    throw e
  }
}

export const selectClassesByTeacher = async (teacher_id: string): Promise<Class[]> => {
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
