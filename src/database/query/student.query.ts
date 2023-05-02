import { Student } from '../models/student.model'
import { SelectedStudentType, StudentType } from '../../types/student.type'
import { StudentClass } from '../models/studentClass.model'

export const selectStudents = async (): Promise<SelectedStudentType[]> => {
  try {
    const students: SelectedStudentType[] = await Student.findAll({
      attributes: ['student_id', 'first_name', 'last_name', 'email']
    })
    return students
  } catch (e: any) {
    throw e
  }
}

export const selectStudent = async (email: string, password?: string): Promise<SelectedStudentType | null> => {
  try {
    if (password) {
      const student = await Student.findOne({
        attributes: ['student_id', 'first_name', 'last_name', 'email'],
        where: {
          email: email,
          password: password
        }
      })
      return student
    } else {
      const student = await Student.findOne({ raw: true, attributes: ['email'], where: { email: email } })
      return student
    }
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}

export const createStudent = async (student: StudentType): Promise<SelectedStudentType | null> => {
  try {
    const res: SelectedStudentType | null = await selectStudent(student.email)
    const exists: boolean = res !== null && typeof res === 'object' ? true : false
    if (!exists) {
      const res = await Student.create(student)
      // const user = res.get({ plain: true })
      // console.log('Student succcesfully created')
      return res
    } else {
      return null
    }
  } catch (e) {
    throw e
  }
}

export const selectClassesByStudent = async (student_id: string): Promise<StudentClass[]> => {
  try {
    const classesByStudent = await StudentClass.findAll({
      where: {
        student_id: student_id
      }
    })
    return classesByStudent
  } catch (e: any) {
    throw e
  }
}
