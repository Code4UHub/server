import { ClassType } from '../../types/class.type'
import { StudentClassType } from '../../types/studentClass.type'
import { Class } from '../models/class.model'
import { StudentClass } from '../models/studentClass.model'

export const selectClasses = async () => {
  try {
    const classes = await Class.findAll({
      raw: true
    })

    return classes
  } catch (e) {
    throw e
  }
}

export const selectClass = async (id: string): Promise<Class[]> => {
  try {
    const classDb = await Class.findAll({
      raw: true,
      where: {
        class_id: id
      }
    })
    return classDb
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}

export const createClass = async (classDb: ClassType): Promise<Class[] | string> => {
  try {
    const res = await selectClass(classDb['class_id'])
    const classExists = res.length > 0 ? true : false

    if (!classExists) {
      const res = await Class.create(classDb)
      const user = res.get({ plain: true })
      console.log('Class succcesfully created')
      return user
    } else {
      return 'Class already exists'
    }
  } catch (e) {
    // throw e
    console.log(e)
    return 'Error at creating class'
  }
}

export const selectStudentsClass = async (studentClass: StudentClassType): Promise<StudentClass[]> => {
  try {
    const studentsByClass = await StudentClass.findAll({
      raw: true,
      where: {
        class_id: studentClass.class_id,
        student_id: studentClass.student_id
      }
    })
    return studentsByClass
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}

export const registerStudentToClass = async (newStudentClass: StudentClassType) => {
  try {
    const res = await selectStudentsClass(newStudentClass)
    const classExists = res.length > 0 ? true : false

    if (!classExists) {
      const res = await StudentClass.create(newStudentClass)

      const user = res.get({ plain: true })
      console.log('Student succcesfully registered')
      return user
    } else {
      return 'Student already registered'
    }
  } catch (e) {
    // throw e
    console.log(e)
    return 'Error at registering student'
  }
}
