import { ClassType } from '../../types/class.type'
import { StudentClassType } from '../../types/studentClass.type'
import { Class } from '../models/class.model'
import { StudentClass } from '../models/studentClass.model'
import { Subject } from '../models/subject.model'

export const selectClasses = async () => {
  try {
    const classes = await Class.findAll({
      attributes: ['class_id', 'subject_id', 'subject.subject_name', 'teacher_id'],
      include: [
        {
          model: Subject,
          attributes: [],
          required: true
        }
      ],
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
      attributes: [
        'class_id',
        'finished_date',
        'days',
        'start_time',
        'end_time',
        'teacher_id',
        'subject_id',
        'subject.subject_name'
      ],
      raw: true,
      where: {
        class_id: id
      },
      include: [
        {
          model: Subject,
          attributes: [],
          required: true
        }
      ]
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

export const selectStudentClass = async (studentClass: StudentClassType): Promise<StudentClass[]> => {
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
    const res = await selectStudentClass(newStudentClass)
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

export const selectStudentsByClass = async (class_id: string): Promise<StudentClass[]> => {
  try {
    const studentsByClass = await StudentClass.findAll({
      raw: true,
      where: {
        class_id: class_id
      }
    })
    return studentsByClass
  } catch (e: any) {
    // throw new Error("MY ERROR")
    throw e
  }
}

export const acceptStudentToClass = async (studentClass: StudentClassType) => {
  try {
    const res = await selectStudentClass(studentClass)
    const studentClassExists = res.length > 0 ? true : false

    if (studentClassExists) {
      const acceptedStudent = await StudentClass.update(

        { pending: false },

        {
          where: {
            class_id: studentClass.class_id,
            student_id: studentClass.student_id
          }
        }
      )

      return acceptedStudent
    } else {
      return 'Student is not registered to that class'
    }
  } catch (e: any) {
    console.log(e)
    return 'Error at acepting student'
  }
}
