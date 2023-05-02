import { Student } from '../models/student.model'
import { Class } from '../models/class.model'
import { Teacher } from '../models/teacher.model'
import { Subject } from '../models/subject.model'
import { SelectedStudentType, StudentType } from '../../types/student.type'
import { StudentClass } from '../models/studentClass.model'

export const selectStudents = async (): Promise<SelectedStudentType[]> => {
  try {
    const students = await Student.findAll({})
    return students
  } catch (e: any) {
    throw e
  }
}

export const selectStudent = async (email: string, password?: string): Promise<SelectedStudentType[]> => {
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
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}

export const createStudent = async (student: StudentType): Promise<SelectedStudentType | string> => {
  try {
    const res = await selectStudent(student.email)
    const studentExists = res.length > 0 ? true : false
    if (!studentExists) {
      const res = await Student.create(student)
      const user = res.get({ plain: true })
      console.log('Student succcesfully created')
      return user
    } else {
      return 'Student already exists'
    }
  } catch (e) {
    // throw e
    console.log(e)
    return 'Couldnt create student'
  }
}

export const selectClassesByStudent = async (student_id: string) => {
  try {
    const classesByStudent = await StudentClass.findAll({
      raw: true,
      attributes: [
        'class_id',
        'pending',
        'class.days',
        'class.start_time',
        'class.end_time',
        'class.teacher.first_name',
        'class.teacher.last_name',
        'class.subject.subject_name'
      ],
      where: {
        student_id: student_id
      },
      include: [
        {
          model: Class,
          attributes: [],
          required: true,
          include: [
            {
              model: Teacher,
              attributes: [],
              required: true
            },
            {
              model: Subject,
              attributes: [],
              required: true
            }
          ]
        }
      ]
    })
    return classesByStudent
  } catch (e: any) {
    // throw new Error("MY ERROR")
    console.log('EEEEEEEE')
    console.log(e)
    throw e
  }
}
